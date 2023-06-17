import express from 'express';
import { createNotification, getNotification, notificationRead } from '../controller/notification.controller';
import { authorize } from '../middleware/Auth';


const Notificationrouter = (app: express.Application) => {
    app.post('/notification', authorize, createNotification);
    app.get('/notification', authorize, getNotification);
    app.put('/notification', authorize, notificationRead);
   

    }

    export default Notificationrouter;