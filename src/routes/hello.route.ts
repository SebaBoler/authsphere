import { Request, Response, Router } from "express";

export const helloRoutes: Router = Router();

helloRoutes.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
