import express from "express";
import morgan from 'morgan';
import { createNewUser, signIn } from "./handlers/user";
import { protect } from "./modules/auth";
import router from './router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  next();
})

app.get("/", (req, res) => {
  res.send("Works!");
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn)

export default app;
