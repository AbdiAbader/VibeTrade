import express from 'express';
import { createReview } from '../controller/review.controller';


const Reviewrouter = express.Router();

Reviewrouter.post('/add', createReview);

export default Reviewrouter;