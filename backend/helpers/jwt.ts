import { Roles } from '@prisma/client';
import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

export interface JwtUser {
  id: number | string;
  email: string | null;
  name: string | null;
  roles: {
    role: Roles;
  }[];
}

declare module 'jsonwebtoken' {
  interface JwtPayload extends JwtUser {}
}

export class JwtUtil {
  /**Create accessToken */
  static signJWT(payload: JwtUser, secret: string, expiresIn: SignOptions['expiresIn'] = '1d'): Promise<string> {
    return new Promise<string>((res, rej): void => {
      sign(
        { ...payload, iat: Math.floor(Date.now() / 1000) },
        secret,
        { algorithm: 'HS256', expiresIn: expiresIn },
        (err, token): void => {
          if (err) rej(err);
          if (token) res(token);
          return res('');
        },
      );
    });
  }

  static verifyJWT = async ({ token, secret }: { token: string; secret: string }): Promise<JwtPayload | null> => {
    return await new Promise<JwtPayload | null>((res): void => {
      verify(token, secret, (err, decoded): void => {
        if (decoded) res(decoded as JwtPayload);
        if (err) res(null);
      });
    });
  };
}
