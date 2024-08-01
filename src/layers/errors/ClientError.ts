import Constants from '../utils/stringLiterals';
import CustomError from './CustomError';

// messaging needs to be displayed from ‘message’ key
export default class ClientError extends CustomError {
  constructor(
    message = Constants.NETWORK_LAYER.PLEASE_TRY_AGAIN,
    extraData = null,
    status?: number
  ) {
    super(message, extraData, status);
  }
}
