import './config.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import jwtStrategy from './authentication/strategy.js';
import {authorizeMiddleware} from './authentication/authorizations.js';
import {authRouter} from './routers/auth.router.js';
import {userRouter} from './routers/user.router.js';
import {coursesRouter} from './routers/course.router.js';
import {topicRouter} from './routers/topic.router.js';
import compression from 'compression';
import RateLimit from 'express-rate-limit';

export const app = express();
const PORT = process.env.EXPRESS_PORT;
const limiter = RateLimit({max: 600});

passport.use(jwtStrategy);

app.use(express.json(), cors(), helmet(), compression(), limiter, morgan('dev'), passport.initialize());

app.use('/service/auth', authRouter);
app.use(
  '/service/users',
  (req, res, next) => authorizeMiddleware(req, res, next),
  userRouter,
);
app.use(
  '/service/courses',
  (req, res, next) => authorizeMiddleware(req, res, next),
  coursesRouter,
);
app.use(
  '/service/topics',
  (req, res, next) => authorizeMiddleware(req, res, next),
  topicRouter,
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
