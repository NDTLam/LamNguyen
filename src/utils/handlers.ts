import { Request, Response, NextFunction, RequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const wrapRequestHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
