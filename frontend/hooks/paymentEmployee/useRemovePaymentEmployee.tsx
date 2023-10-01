'use client';
import { useCallback, useState } from 'react';

import {
  TRemovePaymentEmployeeCommandReq,
  TRemovePaymentEmployeeCommandRes,
  ReqError,
} from '@interface/contracts.types';

export const useRemovePaymentEmployee = (): {
  data: TRemovePaymentEmployeeCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TRemovePaymentEmployeeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TRemovePaymentEmployeeCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TRemovePaymentEmployeeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.removePaymentEmployee(req);
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

  return { data, error, isLoading, remove, reset };
};
