import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import initialRoute from './route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const checkMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('/pub/proxy/')) {
        next()
    } else {
        res.send({ status: false, msg: "route is not containing pub/proxy and api/proxy" })
    }
}
app.use(checkMiddleWare);
app.use(initialRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, true);
    return res.status(400).json({
        error: err.message,
    });
});

export default app;