import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response): void => {
  const { email, password } = req.body
  if (email == 'nguyendangtuonglam2106@gmail.com' && password == '12341234') {
    res.json({
      message: 'Login success'
    })
  }
  res.json({
    message: 'Login failed'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  throw new Error('test error')
  const result = await usersService.register(req.body)
  res.json({
    message: 'register success',
    result
  })
}
