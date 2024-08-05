export class LoggingService {
    private static formatMessage(message: string, data?: any): string {
      return data ? `${message} ${JSON.stringify(data)}` : message;
    }
  
    static info(message: string, data?: any): void {
      console.log(`[INFO] ${this.formatMessage(message, data)}`);
    }
  
    static warn(message: string, data?: any): void {
      console.warn(`[WARN] ${this.formatMessage(message, data)}`);
    }
  
    static error(message: string, data?: any): void {
      console.error(`[ERROR] ${this.formatMessage(message, data)}`);
    }
  
    static debug(message: string, data?: any): void {
      console.debug(`[DEBUG] ${this.formatMessage(message, data)}`);
    }
}