import express from 'express';
import { getrequest } from '../controller/contact.controller';

const ContactRouter = (app: express.Application) => {
    app.get('/request', getrequest);
}

export default ContactRouter;