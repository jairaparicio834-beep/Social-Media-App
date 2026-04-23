'use client'

import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { signInUser } from '@/redux/slices/userSlice';
import { current } from '@reduxjs/toolkit';

const SignUpModal = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen
    );
    const dispatch: AppDispatch = useDispatch()

    async function handleSignUp() {
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        // console.log(userCredentials)
        await updateProfile(userCredentials.user, {
            displayName: name
        })
        dispatch(
            signInUser({
                name: userCredentials.user.displayName,
                username: userCredentials.user.email!.split('@')[0],
                email: userCredentials.user.email,
                uid: userCredentials.user.uid
            })
        )
    }
    async function handleGuestLogIn() {
        await signInWithEmailAndPassword(auth, 'guest1234500@gmail.com', 'password123')
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return
            console.log(currentUser)
            dispatch(signInUser({
                name: currentUser.displayName,
                username: currentUser.email!.split('@')[0],
                email: currentUser.email,
                uid: currentUser.uid
            }))

        })
        return unsubscribed
    }, [])
    return (
        <>
            <button className='w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm font-bold bg-white rounded-full
            '
                onClick={() => dispatch(openSignUpModal())}
            >
                Sign Up
            </button>
            <Modal
                open={isOpen}
                onClose={
                    () => dispatch(closeSignUpModal())
                }
                className='flex justify-center items-center'
            >
                <div className='w-full h-full sm:w-[600px] sm:h-fit sm:rounded-xl outline-none bg-white'>

                    <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
                        onClick={() => dispatch(closeSignUpModal())}
                    />
                    <div className='pt-10 pb-20 px-4 sm:px-20'>
                        <h1 className='text-3xl font-bold mb-10'>
                            Create your account</h1>
                        <div className='w-full space-y-5 mb-10'>
                            <input type="text" className="w-full h-[54px] border-gray-200 border outline-none
                            ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                value={name} />
                            <input className="w-full h-[54px] border-gray-200 border outline-none
                            ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                                placeholder='Email' type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <div className="w-full h-[54px] border-gray-200 border outline-none
                             rounded-[4px] focus-within:border-[#F4AF01] transition overflow-hidden flex items-center pr-3">
                                <input
                                    placeholder='Password' type={showPassword ? 'text' : 'password'}
                                    className='w-full h-full ps-3  outline-none'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
                                <div className='w-7 h-7 text-gray-400 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)} >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSignUp()}
                            className='bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full'>
                            Sign Up
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

export default SignUpModal;
