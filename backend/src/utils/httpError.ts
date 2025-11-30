export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundError = (message: string) => new HttpError(404, message);
export const badRequestError = (message: string) => new HttpError(400, message);

