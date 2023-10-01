import { PrismaError } from 'prisma-error-enum';

export type ErrorCode = '500' | '404' | '403' | '401' | '400';

export type ReqError = {
  error: string;
  payload: {
    message: string;
    target: string[];
    data: Record<string, unknown>;
    code: (typeof PrismaError)[keyof typeof PrismaError] | ErrorCode | string;
    codename: keyof typeof PrismaError | null;
  };
};
