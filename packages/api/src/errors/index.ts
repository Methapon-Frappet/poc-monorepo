import HttpStatus from "./http-status";

export class HttpError extends Error {
  /**
   * HTTP Status Code
   */
  status: HttpStatus;
  message: string;
  code?: string;

  constructor(status: HttpStatus, message: string) {
    super(message);

    this.name = "HttpError";
    this.status = status;
    this.message = message;
  }
}

export function notFound(item: string): never {
  throw new HttpError(HttpStatus.NOT_FOUND, `${item} not found.`);
}

export function noPermission(): never {
  throw new HttpError(HttpStatus.UNAUTHORIZED, "No permission.");
}
