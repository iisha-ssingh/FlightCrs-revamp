import CustomError from './CustomError';

// logout the user
export default class UnauthorizedAccessError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
