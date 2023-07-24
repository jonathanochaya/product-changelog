import express, { NextFunction, Request, Response } from "express";
import morgan from 'morgan';
import { createNewUser, signIn } from "./handlers/user";
import { protect } from "./modules/auth";
import router from './router';
import { AllErrorHandler } from "./types/custom";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Works!");
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signIn)

/* default error handler */
app.use((err: AllErrorHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(`Path: ${req.path}, Error: ${err.name}, Message: ${err.message}`);
  next();
});


export default app;