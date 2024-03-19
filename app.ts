import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "./src/routes";

const {PORT = 3000} = process.env;
const ENV = process.env.NODE_ENV || "development";


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());


app.use("/", Routes);

function error404(req: Request, res: Response) {
    return res.status(404).send({
        success: false,
        message: "Invalid URL"
    });
}

app.use(error404);


app.listen(PORT, async () => {

    console.log(`App running in ${ENV} mode on port ${PORT}`);

});
export default app;
