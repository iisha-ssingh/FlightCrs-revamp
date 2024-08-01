import CustomError from './CustomError';

// logout the user
export default class ForbiddenError extends CustomError {
  constructor(message: string, status?: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}
