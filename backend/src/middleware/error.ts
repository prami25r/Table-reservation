import { Request, Response, NextFunction } from "express";

export default (err: any, _: Request, res: Response, __: NextFunction) =>
  res.status(500).json({ error: err.message });
