import "dotenv/config";
import express,{NextFunction,Request,Response} from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import session from "cookie-session"
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();// express ka instance banaya
const BASE_PATH= config.BASE_PATH ;

app.use(express.json());// json understand karega express jo body mein bhejoge

app.use(express.urlencoded({ extended: true }));//“Hey, people might send data like name=Ayush&email=ayush@gmail.com — please convert that into an object.”

//This creates a session cookie — a way for your server to “remember” a user across multiple requests.
app.use(
    session({
        name: 'session',
        keys: [config.SESSION_SECRET],//Used to encrypt the cookie data, so users can’t modify it.
        maxAge: 24 * 60 * 60 * 1000,// 24 hours in milliseconds
        secure: config.NODE_ENV === 'production',
        httpOnly: true,//makes cookies server side
        sameSite: 'lax',//Helps prevent cross-site request forgery (security feature).
    })
);

app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
);

app.get('/', (req:Request, res:Response) => {
    res.status(HTTPSTATUS.OK).json({ message: 'Welcome to the API' });
}); 

app.use(errorHandler);

app.listen(config.PORT, async() => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
    await connectDatabase();
});