'use client'
import React, { useEffect, useState } from 'react';
import PostInput from './PostInput';
import Post from './Post';
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDispatch } from 'react-redux';
import { closeLoadingScreen } from '@/redux/slices/loadingSlice';

const PostFeed = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const dispatch = useDispatch()
    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const snapshotsDocs = snapshot.docs
            setPosts(snapshotsDocs)
            dispatch(closeLoadingScreen())
        })
        return unsubscribe
    }, [])
    return (
        <div className='flex-grow max-w-2x1 border-x border-gray-100'>
            <div className='py-4 px-3 text-lg sm:texxt-xl sticky top-0
            z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold
            border-b border-gray-100
            '>
                Home
            </div>
            <PostInput />

            {
                posts.map(post => (
                    <Post key={post.id}
                        data={post.data()}
                        id={post.id} />
                ))
            }
        </div>
    );
}

export default PostFeed;
