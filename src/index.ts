import express from 'express'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { Request, Response, NextFunction } from 'express'

databaseService.connect()
const app = express()
const port = 3000
app.use(express.json())
app.use('/users', usersRouter)
interface ErrorHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void
}

const errorHandler: ErrorHandler = (err, req, res, next) => defaultErrorHandler(err, req, res, next)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
