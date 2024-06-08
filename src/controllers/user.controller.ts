import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { createUserSwagger, updateUserAttributesSwagger } from "./user.swagger";

const userService = new UserService();

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    const { realmName, username, password, attributes } = req.body;
    try {
      await userService.createUser(realmName, username, password, attributes);
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(500).send("Error creating user");
    }
  }

  static async updateUserAttributes(
    req: Request,
    res: Response
  ): Promise<void> {
    const { realmName, username, attributes } = req.body;
    try {
      await userService.updateUserAttributes(realmName, username, attributes);
      res.status(200).send("User attributes updated successfully");
    } catch (error) {
      res.status(500).send("Error updating user attributes");
    }
  }
}
