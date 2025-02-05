import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import config from "../config";
import {OAuth2Client} from "google-auth-library";

const userRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

userRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        })

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).send({error: 'Invalid credential. Google login error!'});
            return
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture

        if (!email) {
            res.status(400).send({error: 'No enough data from Google'});
            return;
        }

        let user = await User.findOne({googleId: id});

        if (!user) {
            user = new User({
                username: displayName,
                password: crypto.randomUUID(),
                googleId: id,
                avatar: avatar
            });
        }

        user.generateToken();
        await user.save();
        res.send({message: 'Login with Google success.', user})

    } catch (e) {
        next(e);
    }
});

userRouter.post("/register", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        res.send(user)
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).send({error: "User not found"});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            res.status(400).send({error: "Password is  wrong"});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password is correct', user});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
    }
});

userRouter.delete("/sessions", auth, async (req, res, next) => {
    const userFromAuth = (req as RequestWithUser).user;

    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: "User logout successfully."});
        }
    } catch (e) {
        next(e);
    }
});

export default userRouter;