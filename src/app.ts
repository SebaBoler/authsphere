import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { userRoutes } from "./routes/user.route";
import { helloRoutes } from "./routes/hello.route";

const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/v1/users", userRoutes);
app.get("/v1/hello", helloRoutes);
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("*", (req: express.Request, res: express.Response) => {
  res.sendStatus(404);
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send(err.message ? err.message : err);
  }
);

export { app };
