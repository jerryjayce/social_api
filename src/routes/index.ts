import express from "express";
const app = express();
import AuthRoutes from "../auth/routes";
import CommentRoutes from "../comment/routes";
import {auth} from "../middleware/Authorization";


app.use("/v1/api/auth", AuthRoutes);
app.use("/v1", auth, CommentRoutes);
export  default app;


