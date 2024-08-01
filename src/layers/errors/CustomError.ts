export default class CustomError extends Error {
  data: any;
  status?: number;

  constructor(this: CustomError, message: string, extraData?: any, status?: number) {
    super(message);
    this.name = this.constructor.name;
    this.data = extraData;
    this.status = status;

    // Make the "message" property enumerable
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
