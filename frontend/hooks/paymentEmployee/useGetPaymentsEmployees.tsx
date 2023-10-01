'use client';
import { useCallback, useState } from 'react';

import { TGetPaymentsEmployeesQueryRes, TGetPaymentsEmployeesQueryReq, ReqError } from '@interface/contracts.types';

export const useGetPaymentsEmployees = (): {
  data: TGetPaymentsEmployeesQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetPaymentsEmployeesQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetPaymentsEmployeesQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetPaymentsEmployeesQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.getPaymentEmployees(req);
          if (Array.isArray(res)) setData(res);
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
    setData([]);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
