'use client';
import { useCallback, useState } from 'react';

import { TAddPaymentEmployeeCommandReq, TAddPaymentEmployeeCommandRes, ReqError } from '@interface/contracts.types';

export const useAddPaymentsEmployee = (): {
  data: TAddPaymentEmployeeCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddPaymentEmployeeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddPaymentEmployeeCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddPaymentEmployeeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.addPaymentEmployee(req);
          if ('success' in res) setData(res.success);
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

  return { data, error, isLoading, add, reset };
};
