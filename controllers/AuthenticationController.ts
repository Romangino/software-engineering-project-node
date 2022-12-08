import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";

const bcrypt = require('bcrypt')
const saltRounds = 10

const AuthenticationController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();

    const login = async (req: any, res: any) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao
            .findUserByUsername(username);
        let match = false
        try {
            match = await bcrypt.compare(password, existingUser.password);
        } catch(e){
            console.log(e)
        }

        if (match) {
            existingUser.password = '*****';
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    const register = async (req: any, res: any) => {
        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    const profile = (req: any, res: any) => {
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(402);
        }
    }

    const logout = (req: any, res: any) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthenticationController;