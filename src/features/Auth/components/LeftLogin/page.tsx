"use client"

import Image from 'next/image';
import { aqarat1 } from '../../../../../public/assests/page';
import { Button, Checkbox, Input, useAuth } from '../../../../components/page';
import { useForm } from 'react-hook-form';
import { SignInFormInputsType } from '../../types/page';
import { API_SERVICES_URLS, FORM_VALIDATION } from '../../../../data/page';
import { getFieldHelperText } from '../../../../utils/page';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../lib/axios/page';
import Link from 'next/link';

export const LeftLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputsType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setIsAuthenticated, userData, updateUserData } = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(API_SERVICES_URLS.SIGN_IN, data);
      if (response.status === 200) {
        console.log('Login successful', response.data);
        updateUserData(response.data.data);
        setIsAuthenticated(true);
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Login failed', error.response?.data || error.message);
      setErrorMessage('Invalid Log In Credentials');
    }
  });

  return (
    <div>
      {userData?.logoUrl ? (
        <Image src={userData.logoUrl} alt='Logo' width={220} height={65} />
      ) : (
        <Image src={aqarat1} alt='aqarat_logo' width={220} height={65} className='max-custom:mx-auto'/>
      )}
      <div className='lg:pl-28 custom:pl-5 '>
        <div className='whitespace-nowrap max-xs:hidden  max-custom:whitespace-pre-line'>
          <h1 className='font-nunito font-[530] md:text-3xl text-xl  pt-10'>
            Premier Real Estate Management Platform
          </h1>
          <p className='text-gray-500 md:text-lg text-sm pt-5'>
            Effortlessly upload, manage, and monitor the success of your
            property <br /> listings with our cutting-edge tools.
          </p>
        </div>
        <div>
          <form className='font-nunito w-full' onSubmit={onSubmit}>
            <div className='custom:max-w-[450px] bg-[#F9F9F9] custom:rounded-lg custom:shadow py-8 max-xs:py-20 px-5 mt-8'>
              <Input
                type='email'
                label='Email Address'
                id='email'
                className='mb-5'
                {...register('email', FORM_VALIDATION.email)}
                error={!!errors.email}
                helperText={getFieldHelperText('error', errors.email?.message)}
              />
              <Input
                type='password'
                label=' Password'
                id='password'
                {...register('password', FORM_VALIDATION.password)}
                error={!!errors.password}
                helperText={getFieldHelperText('error', errors.password?.message)}
              />
              <div className='flex justify-between items-center font-nunito'>
                <div className='flex items-center text-darkSecondary text-[14px]'>
                  <Checkbox /> <span className='px-2'>Remember me</span>
                </div>
                <Link
                  href={'#'}
                  className='text-primary font-[550] text-[12px] underline'
                >
                  Forget Password
                </Link>
              </div>
              <Button
                className='bg-primary text-white uppercase px-10 mt-10 mx-auto'
                type='submit'
                buttonLoadingProps={{ loadingText: 'Login In...' }}
                loading={isSubmitting}
              >
                LOGIN
              </Button>
              {errorMessage && (
                <div className='mt-5 text-sm text-red-500 text-center'>
                  {errorMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeftLogin;

