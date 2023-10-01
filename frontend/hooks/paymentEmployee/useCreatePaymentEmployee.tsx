'use client';
import { useCallback, useState } from 'react';

import {
  TCreatePaymentEmployeeCommandReq,
  TCreatePaymentEmployeeCommandRes,
  ReqError,
} from '@interface/contracts.types';

export const useCreatePaymentEmployee = (): {
  data: TCreatePaymentEmployeeCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  create: (req: TCreatePaymentEmployeeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TCreatePaymentEmployeeCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const create = useCallback(
    async (req: TCreatePaymentEmployeeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.create(req);
          if ('id' in res) setData(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, create, reset };
};
