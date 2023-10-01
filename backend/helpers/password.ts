import { randomBytes, pbkdf2, randomUUID } from 'node:crypto';

import { promisify } from 'util';

export interface ICompare {
  hashed: string;
  password: string;
}

export interface IHash {
  password: string;
  salt?: string;
}

export interface IHashData {
  str: string;
  salt: string;
}

export class PasswordUtil {
  public passwordLength = 128;
  public saltLen = 16;
  public iterations = 1000;
  public digest = 'sha512';

  hashData = async ({ str, salt }: Required<IHashData>): Promise<string> => {
    const hash = await promisify(pbkdf2)(str, salt, this.iterations, this.passwordLength, this.digest);
    return hash.toString('hex');
  };

  /*** Password hash */
  hash = async ({ password, salt }: IHash): Promise<string> => {
    salt = salt || randomBytes(this.saltLen).toString('hex').slice(0, this.saltLen);
    const hash = await promisify(pbkdf2)(password, salt, this.iterations, this.passwordLength, this.digest);
    return [salt, this.iterations.toString(), hash.toString('hex')].join('.');
  };

  /*** Validation the password */
  compare = async ({ hashed, password }: ICompare): Promise<{ pass: boolean; salt: string }> => {
    try {
      const [salt, iterations, hash] = hashed.split('.');
      if (!iterations || !hash) throw new Error('Credentials invalid');
      const checkHashed = await this.hash({ password, salt });
      if (checkHashed !== hashed) throw new Error('Credentials invalid');
      return { salt, pass: true };
    } catch {
      throw new Error('Credentials invalid');
    }
  };

  /*** Random password */
  static createKey = (size?: number): string => {
    return randomBytes(size || 10)
      .toString('hex')
      .slice(0, size || 10)
      .toUpperCase();
  };

  /*** Random byte */
  static randomBytes = (size = 48): string => {
    return randomBytes(size).toString('hex').slice(0, size);
  };

  generateToken = (): string => {
    if (randomUUID) return randomUUID();
    return PasswordUtil.randomBytes(32);
  };
}
