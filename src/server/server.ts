import mongoose from 'mongoose';
import express from 'express';
import { json } from 'body-parser';
import userRoutes from  './routes/user_route';



const app = express();
app.use(json());

app.get('/', (req: express.Request, res: express.Response): void => {
    res.send('Hello World');
  });
app.use('/user', userRoutes);



app.listen(3000, () => {
    mongoose.connect('mongodb+srv://abdi:1111@cluster0.sm9f9b4.mongodb.net/test_may_25?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database');
    }
    ).catch(() => {
        console.log('Connection failed');
    });
    console.log('Listening on port 3000');
    }



);


