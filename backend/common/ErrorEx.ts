import { PrismaError } from 'prisma-error-enum';

import { ErrorCode, ReqError } from '../types';

/*** Not work with invokers and preload file. */
export class ErrorEx extends Error {
  public message: string = 'Something went wrong!';
  public code: (typeof PrismaError)[keyof typeof PrismaError] | ErrorCode | string = 'P1012';
  public codename: keyof typeof PrismaError | null = null;
  public target: string[] = [];
  public data: Record<string, unknown> = {};
  //
  public meta?: {
    target?: string[];
    data?: Record<string, unknown>;
  };
  errorCode?: string;

  constructor({ message, code, target, codename, meta, errorCode }: Partial<ErrorEx>) {
    super();
    if (message) this.message = message;
    if (code) this.code = code;
    if (errorCode && this.code !== 'P1012') this.code = errorCode;
    if (target) this.target = target;
    if (meta?.target) this.target = meta.target;
    if (meta?.data) this.data = meta.data;
    if (codename) this.codename = codename;
    this.codeName();
  }

  private codeName = (): void => {
    if (!this.code) return;
    for (const [key, v] of Object.entries<ErrorEx['code']>(PrismaError)) {
      if (v === this.code) {
        this.codename = key as keyof typeof PrismaError;
      }
    }
  };

  public req = (msg: string = this.message): ReqError => {
    return {
      error: msg,
      payload: {
        message: this.message,
        target: this.target,
        code: this.code,
        codename: this.codename,
        data: this.data,
      },
    };
  };
}
