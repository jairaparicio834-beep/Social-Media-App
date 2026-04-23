'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '@/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { closeLoginModal } from '@/redux/slices/modalSlice';
const SidebarUserInfo = () => {
    const dispatch: AppDispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false)
    const user = useSelector((state: RootState) => state.user)
    async function handleSignOut() {
        await signOut(auth)
        dispatch(signOutUser())
        dispatch(closeLoginModal())
    }
    return (
        <>
            {user.email &&
                <div className='absolute bottom-6 flex items-center justify-start
            space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-500 hover:bg-opacity-10 transition
            w-fit xl:w-[240px] cursor-pointer rounded-full
            '
                    onClick={() => handleSignOut()}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <Image
                        src={'/assets 15/profile-pic.png'}
                        width={36}
                        height={36}
                        alt='Profile Pic'
                        className='w-9 h-9'
                    />


                    <div className='hidden xl:flex flex-col text-sm max-40 transistion'>
                        {isHovered ? (
                            <span className='font-bold'>Logout</span>
                        ) : (
                            <>
                                <span className='whitespace-nowrap text-ellipsis overflow-hidden font-bold'>{user.name}</span>
                                <span className='whitespace-nowrap text-ellipsis overflow-hidden text-gray-500'>@{user.username}</span>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default SidebarUserInfo;
