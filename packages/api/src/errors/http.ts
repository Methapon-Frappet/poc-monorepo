import HttpStatus from "../interface/http-status";

export class HttpError extends Error {
  /**
   * HTTP Status Code
   */
  status: HttpStatus;
  message: string;
  code?: string;

  constructor(status: HttpStatus, message: string | Record<string, any>) {
    const msg = JSON.stringify(message);

    super(msg);

    this.name = "HttpError";
    this.status = status;
    this.message = msg;
  }
}

export function notFound(item: string): never {
  throw new HttpError(HttpStatus.NOT_FOUND, `${item} not found.`);
}

export function noPermission(): never {
  throw new HttpError(HttpStatus.UNAUTHORIZED, "No permission.");
}
