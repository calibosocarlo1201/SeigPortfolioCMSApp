import React from 'react'
import logo from '/assets/logo.png';
import { Controller, useForm } from 'react-hook-form';
import InputComponent from '../components/InputComponent';
import { useLoginMutation } from '../slices/userSlice';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import ClipLoader from "react-spinners/ClipLoader";


const schema = z.object({
    username: z.string().min(1, 'Please enter your username'),
    password: z.string().min(1, 'Please enter your password')
})

const LoginScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [login, {isLoading: isLoadingLogin, error: loginError}] = useLoginMutation();

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await login(data).unwrap();
    
            if (response) {
                dispatch(setCredentials({...response}));
                toast.success('Login Success');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.data?.message || 'Login Failed');
        }
    };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center space-x-3 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className='w-[50px]' src={logo} alt="logo" />
                <span>Seig CMS</span>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Controller name="username" control={control} render={({field}) => (
                                <InputComponent inputLabel='Username' errorMessage={errors.username?.message} {...field} />
                            )}  />
                        </div>
                        <div>
                            <Controller name="password" control={control} render={({field}) => (
                                <InputComponent inputLabel='Password' errorMessage={errors.password?.message} {...field} isPassword />
                            )} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        {/* add react spinner when login loading */}

                        {isLoadingLogin && <div className='text-center mt-5'><ClipLoader /></div>}
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoginScreen