import { createContactus } from '../controller/contactus.controller';
import express from 'express';
const ContactUsRouter = (app: express.Application) => {
    app.post('/contactus', createContactus);
}
export default ContactUsRouter;
