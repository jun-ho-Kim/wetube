import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
    getLogin, 
    getJoin, 
    logout, 
    postLogin, 
    postJoin, 
    githubLoign,
    postGithubLogin,
    getMe
} from "../controller/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();



globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLoign);

globalRouter.get(routes.githubCallback, 
passport.authenticate('github', {failureRedirect: "/login"}),
postGithubLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;