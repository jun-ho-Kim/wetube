import express from "express";
import { routes } from "./routes";


const apiRouter = express.Router();

apiRouter.get(routes.json);

export default apiRouter;