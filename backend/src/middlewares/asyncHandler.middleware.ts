import { NextFunction, Request, Response } from "express";

// Step 1: Define the type of async controller function, Koi bhi function jisme (req, res, next) aata hai
// aur jo Promise return karta hai
// (yaani async function hai),
// uska type ye AsyncControllerType hai.
type AsyncControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Step 2: Define the asyncHandler wrapper
export const asyncHandler = (
  controller: AsyncControllerType
): AsyncControllerType => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error); // passes the error to your global errorHandler
    }
  };
};
