import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userSchema from '../models/userSchema';

exports.register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, } = req.body;

        // checking if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Password validation regular expression pattern
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        
        // Check if the password matches the required pattern
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Invalid password format' });
        }

         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);
         
         // Create a new user
         const newUser = new userSchema({
            name,
            email,
            password: hashedPassword,
        });
        
        // Save the user in the database
        await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userSchema.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'yoursecretkey', { expiresIn: '1h' });
    
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
  }
};
