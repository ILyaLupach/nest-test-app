import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidationException extends HttpException {
  constructor(response) {
    const errorBody = {
      errors: response,
    }
    super(errorBody, HttpStatus.BAD_REQUEST)
  }
}
