import { CustomError } from './custom-errors';

export class PassportAuthError extends CustomError {
  statusCode = 401;

  constructor(public message: string){
    super(message);

    // extending build in function
    Object.setPrototypeOf(this, PassportAuthError.prototype)
  }

  serializeErrors(){
    return [{ message: this.message }]
  }
}