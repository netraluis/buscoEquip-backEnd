import { CustomError } from './custom-errors';

export class IncorrectType extends CustomError {
  statusCode = 404;

  constructor(){
    super('incorrect type');

    Object.setPrototypeOf(this, IncorrectType.prototype);
  }

	serializeErrors(){
		return [{message: 'Incorrect type'}];
	}

}