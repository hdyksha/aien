import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
};
