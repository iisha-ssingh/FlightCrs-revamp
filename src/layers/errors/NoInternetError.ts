import Constants from '../utils/StringLiterals';
import CustomError from './CustomError';

// Retry button needs to be displayed
export default class NoInternetError extends CustomError {
    constructor(
        message = Constants.NETWORK_LAYER.PLEASE_TRY_AGAIN,
        extraData?: any,
        status?: number
    ) {
        super(message, extraData, status);
    }
}
