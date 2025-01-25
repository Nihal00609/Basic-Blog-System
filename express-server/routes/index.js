import multer from "multer";
import { Router } from "express";

import { MONTHS } from "../config/index.js";
import { test_routes } from "./test-routes.js";
import { commentPostController, createPostCotroller, deletePostController, editPostController, getAllPostsController, getSpecificPostController, getUsersController, loginController } from "../controllers/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// for multer (if required)
const directory =
    "./" +
    `public/images/${new Date().getUTCFullYear()}/${MONTHS[new Date().getMonth()]
    }`;

const fileUpload = multer({
    dest: directory,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const server_routes = Router();

server_routes.use(test_routes);

server_routes.post("/login", loginController)
server_routes.get("/users", authMiddleware, getUsersController)
server_routes.post("/posts", authMiddleware, createPostCotroller)
server_routes.get("/posts", getAllPostsController)
server_routes.get("/posts/:id", getSpecificPostController)
server_routes.put("/posts/:id", authMiddleware, editPostController)
server_routes.delete("/posts/:id", authMiddleware, deletePostController)
server_routes.post("/posts/:id/comments", commentPostController)

