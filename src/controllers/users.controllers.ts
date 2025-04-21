import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import {
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  TokenPayload,
  VerifyEmailReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/Users.schemas'
import databaseService from '~/services/database.services'

import usersService from '~/services/users.services'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USER_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.email_verify_token === '') {
    return res.json({
      message: USER_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await usersService.verifyEmail(user_id)
  return res.json({
    message: USER_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
  /*const { user_id } = req.body
  if (!ObjectId.isValid(user_id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid user ID format'
    })
  }
  const user = await databaseService.users.findOne({
    _id: ObjectId.createFromHexString(user_id)
  })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USER_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.email_verify_token === '') {
    return res.json({
      message: USER_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await usersService.verifyEmail(user_id)
  return res.json({
    message: USER_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })*/
}
export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USER_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USER_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const reslut = await usersService.resendVerifyEmail(user_id)
  return res.json(reslut)
}
