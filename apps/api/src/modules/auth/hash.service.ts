import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  // Number of rounds to generate random salt
  // The bigger value, the better hash, slower speed
  static ROUNDS = 10;

  hash = async (value: string): Promise<string> => {
    return await bcrypt.hash(value, HashService.ROUNDS);
  };

  verifyHash = async ({ data, hashed }: { data: string; hashed: string }) => {
    return await bcrypt.compare(data, hashed);
  };
}
