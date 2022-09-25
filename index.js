import express from "express";
import mongoose from "mongoose";

import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import key from './key.js';

mongoose
  .connect(key.MONGO_URI)
  .then(() => {
    console.log('DB Ok');
  })
  .catch(e => {
    console.log('DB error', e)
  })

const app = express();

app.use(express.json());

app.post('/login', loginValidation, UserController.login);
app.post('/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
});