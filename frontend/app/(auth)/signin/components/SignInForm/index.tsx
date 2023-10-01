'use client';
import { useState } from 'react';
import { useSessionContext, useUserContext } from '@app/contexts';
import { useForm } from 'react-hook-form';
import { Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button } from '@chakra-ui/react';

import styles from '../../../components/forms.module.css';

export const SignInForm = (): JSX.Element => {
  const { signIn } = useSessionContext();
  const { addUser } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<{ name: string; password: string }>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (data: { name: string; password: string }) => {
    setLoading(true);
    try {
      const res = await window.api.database.auth.signIn(data);
      if (res && 'id' in res) {
        reset();
        addUser(res);

        signIn({ callback: '/', type: 'signin' }, res);
        setLoading(false);
      } else if (res !== null) {
        if (res.error) setErrorMessage(res.error);
        setLoading(false);
      } else setErrorMessage('You are unable to sign in!');
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error?.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormControl isInvalid={!!errorMessage}>
        <FormErrorMessage>{<>{errorMessage}</>}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.name?.message}>
        <FormLabel>Name</FormLabel>
        <Input
          {...register('name', {
            required: {
              value: true,
              message: 'Enter the correct name.',
            },
          })}
          type="text"
          placeholder="Enter your name"
        />
        <FormErrorMessage>{errors && <>{errors.name?.message}</>}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.password?.message}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', {
            required: {
              value: true,
              message: 'Enter the correct password.',
            },
          })}
          required
          type="password"
          placeholder="Enter your password"
        />
        {!watch('password') && <FormHelperText>{"We'll never share your password."}</FormHelperText>}
        <FormErrorMessage>Password is required.</FormErrorMessage>
      </FormControl>

      <Button disabled={loading} type="submit" variant="outline" width={'100%'}>
        {loading ? 'loading...' : 'Submit'}
      </Button>
    </form>
  );
};
