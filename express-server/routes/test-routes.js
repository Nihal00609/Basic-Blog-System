import { Router } from "express";
//
import { testController } from "../controllers/index.js";

export const test_routes = Router();

test_routes.get("/test", testController);
