/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));
app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
mongoose.connect('mongodb://localhost:27017/fsd', options)

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);


const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());