import { PaymentEmployee } from '@prisma/client';

export interface Props {
  userId: number | null;
  payment?: PaymentEmployee;
}
