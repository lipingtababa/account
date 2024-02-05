export class CreditException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreditException';
  }
}

export class NoAccountException extends CreditException {
  constructor(message: string) {
    super(message);
    this.name = 'NoAccountException';
  }
}