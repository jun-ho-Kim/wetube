import express from "express";
import apiRouter from "./router";
import { routes } from "./routes";


apiRouter.use(routes.ipApi);