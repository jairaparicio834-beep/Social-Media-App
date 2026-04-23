'use client'

import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { closeLoginModal, openLoginModal } from '@/redux/slices/modalSlice';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const LoginModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen
    );
    const dispatch: AppDispatch = useDispatch()

    async function handleLogIn() {
        await signInWithEmailAndPassword(auth, email, password)
    }

    async function handleGuestLogIn() {
        await signInWithEmailAndPassword(auth, 'guest1234500@gmail.com', 'password123')
    }
    return (
        <>
            <button className='w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm border boder-2 border-gray-100
                rounded-full text-white font-bold hover:bg-white hover:bg-opacity-25'
                onClick={() => dispatch(openLoginModal())}
            >Log In</button>
            <Modal
                open={isOpen}
                onClose={
                    () => dispatch(closeLoginModal())
                }
                className='flex justify-center items-center'
            >
                <div className='w-full h-full sm:w-[600px] sm:h-fit sm: outline-none rounded-xl bg-white'>

                    <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
                        onClick={() => dispatch(closeLoginModal())}
                    />
                    <div className='pt-10 pb-20 px-4 sm:px-20'>
                        <h1 className='text-3xl font-bold mb-10'>
                            Log In to Busy Bee</h1>
                        <div className='w-full space-y-5 mb-10'>
                            <input className="w-full h-[54px] border-gray-200 border outline-none
                            ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                                placeholder='Email' type='email'
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                            <div className="w-full h-[54px] border-gray-200 border outline-none
                             rounded-[4px] focus-within:border-[#F4AF01] transition overflow-hidden flex items-center pr-3">
                                <input
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                    placeholder='Password' type={showPassword ? 'text' : 'password'}
                                    className='w-full h-full ps-3  outline-none' />
                                <div className='w-7 h-7 text-gray-400 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)} >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleLogIn()}
                            className='bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full'>
                            Log In
                        </button>
                        <span className='mb-5 text-sm text-center block'>Or</span>
                        <button
                            onClick={() => handleGuestLogIn()}
                            className='bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full'>
                            Log In as Guest
                        </button>
                    </div>
                </div>
            </Modal >
        </>
    );
}

export default LoginModal;
