'use client';
import React, { useEffect, memo } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  Flex,
} from '@chakra-ui/react';

import { ModalAuthProps } from './props';
import { useUserConnect } from '@hooks/auth';
import { SignInButton, SignUpButton, ToggleThem } from '@app/components';

export const ModalAuth: React.FC<ModalAuthProps> = ({ loading }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, error, connect } = useUserConnect();

  useEffect(() => {
    onOpen();
    connect();
  }, []);

  useEffect(() => {
    if (isAuth) onClose();
    if (!isAuth) onOpen();
  }, [isAuth]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {loading && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'full'}
          closeOnEsc={false}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
            <ModalHeader
              display={'flex'}
              justifyContent={'end'}
              alignItems={'center'}
              flexDirection={'row'}
              width={'full'}
            >
              <ToggleThem />
            </ModalHeader>
            <ModalBody
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              flexDirection={'column'}
              gap={'2rem'}
            >
              <Heading as="h1" size="4xl" lineHeight={2} userSelect={'none'} _dark={{ color: 'orange.300' }}>
                Accounting Book
              </Heading>
              <Flex
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
                gap={'1rem'}
                flexDirection={'column'}
                marginBottom={'auto'}
                marginTop={'auto'}
              >
                <SignInButton width={'150px'} height={'50px'} />
                <SignUpButton width={'150px'} height={'50px'} />
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default memo(ModalAuth);
