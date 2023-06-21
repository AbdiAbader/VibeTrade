import mongoose from 'mongoose';
import MongoClient from 'mongodb';
import express from 'express';
import { json } from 'body-parser';
import userRoutes from  './routes/user_route';
import productRoutes from  './routes/product.route';
import OrderRouter from './routes/order_route';
import ReviewRouter from './routes/review.route';
import  * as dotenv from 'dotenv';
import { authorize } from './middleware/Auth';
import UserRouter from './routes/user_route';
import WishlistRouter from './routes/wishlist_route';
import ContactUsRouter from './routes/contactus.route';
import Notificationrouter from './routes/notify.route';


dotenv.config();


 const app = express();
app.use(json());
// enable CORS
app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

app.get('/', (req: express.Request, res: express.Response): void => {
  res.json({ message: 'Hello, world!' });
  });
  
UserRouter(app);
productRoutes(app);
OrderRouter(app);
WishlistRouter(app);
ContactUsRouter(app);
ReviewRouter(app);
Notificationrouter(app);

const mongodb_url = 'mongodb+srv://abdi:1111@cluster0.sm9f9b4.mongodb.net/test_may_28?retryWrites=true&w=majority';


mongoose.connect(mongodb_url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Connection to MongoDB failed:', error);
  });


 

  export default app;