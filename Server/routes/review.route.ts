import express from 'express';
import { createReview, getReview, updatelike , updatedislike, createReply} from '../controller/review.controller';
import { authorize } from '../middleware/Auth';



const Reviewrouter = (app: express.Application) => {
    app.post('/review', authorize, createReview);
    app.get('/review/:id', authorize, getReview);
    app.put('/review/:id', authorize, updatelike);
    app.put('/review/dislike/:id', authorize, updatedislike);
    app.post('/review/reply/:id', authorize, createReply);
   


    }

export default Reviewrouter;
