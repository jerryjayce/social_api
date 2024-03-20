import express from "express";
const app = express();
import AuthRoutes from "../auth/routes";
import CommentRoutes from "../post_comment/routes";
import {auth} from "../middleware/Authorization";


app.use("/auth", AuthRoutes);
app.use("", auth, CommentRoutes);
export  default app;


