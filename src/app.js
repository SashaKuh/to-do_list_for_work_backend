import express from 'express';
import cors from 'cors'
import pino from 'pino-http';

import { authRoute, todoRoute } from './routers/index.js'
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundError } from './middleware/notFoundError.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
        pino({
                transport: {
                        target: 'pino-pretty',
                },
        }),
);

app.use('/api/auth', authRoute);
app.use('/api/todo', todoRoute);

app.use('*', notFoundError);
app.use(errorHandler);

export default app;