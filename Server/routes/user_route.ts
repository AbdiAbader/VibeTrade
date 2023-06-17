import express from 'express';
import { createUser, login, getbyID, updateUserById, checkToken} from '../controller/user_controller';
import { authorize } from '../middleware/Auth'

const UserRouter = (app: express.Application) => {
    app.post('/user', createUser);
    app.post('/user/login', login);
    app.get('/user/', authorize , getbyID);
    app.put('/user/', authorize , updateUserById);
    app.get('/user/checktoken', authorize , checkToken);

    }
export default UserRouter;
