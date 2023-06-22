import express from 'express';
import { createUser, login, getbyID, updateUserById, checkToken, getUsers, deleteUserById, updatebyid} from '../controller/user_controller';
import { authorize } from '../middleware/Auth'
import { getAll } from '../controller/product.controller';
import { get } from 'http';

const UserRouter = (app: express.Application) => {
    app.post('/user', createUser);
    app.post('/user/login', login);
    app.get('/user/', getUsers);
    app.put('/user/', updateUserById);
    app.delete('/user/:id', deleteUserById);
    app.put('/user/:id', authorize, updatebyid);

    

    }
export default UserRouter;
