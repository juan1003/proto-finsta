'use client'

import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/20/solid'

type User = {
    id: number,
    avatar: string,
    name: string
}

type Post = {
    id: number,
    userId: number,
    picture: string,
    likes: number
}

function Card ({ post, user, likePost }: { post: Post, user: User | undefined, likePost: any }) {

    return ( 
        <div className="border-b border-white/50 w-full lg:w-[650px] min-h-[350px]">
            <div className="flex flex-row justify-between items-center w-full relative top-0 px-5 mb-5">
                <img className='h-10 w-10 rounded-full' srcSet={user!.avatar}/> 
                <span className='font-bold'>{user!.name}</span>
                <button className='text-2xl'>...</button>
            </div>
            <div className='w-full min-h-[350px] lg:min-h-[550px] border border-white/50 rounded-lg flex flex-row justify-center items-center'>
                <img className='w-full h-auto relative' srcSet={post.picture}/>
            </div>
            <div className='flex flex-row justify-start items-center'>
                <div className='w-full py-3 px-5 flex flex-row justify-start items-center gap-2'>
                    <button className='h-7 w-7' onClick={likePost}><HeartIcon/></button>
                    <span>{post.likes}</span>
                </div>
            </div>
        </div>
    )
}

const initialPosts = [
    {
        id: 1,
        userId: 1,
        picture: 'https://i.imgur.com/cufIziI.gif',
        likes: 0
    },
    {
        id: 2,
        userId: 2,
        picture: 'https://i.imgur.com/OE79JSY.png',
        likes: 0
    }
]

const initialUsers = [
    { id: 1, avatar: 'https://randomuser.me/api/portraits/men/75.jpg', name: "John Gotti" },
    { id: 2, avatar: 'https://randomuser.me/api/portraits/women/55.jpg', name: "Rosa Merleno" },
    { id: 3, avatar: 'https://randomuser.me/api/portraits/men/40.jpg', name: "Gerard Butler" },
]

export default function Home() {

const [users, setUsers] = useState<User[]>(initialUsers)
const [posts, setPosts] = useState<Post[]>(initialPosts)

useEffect(() => { return function () { console.log("READY") }}, []);

function likePost (postId: number) {
    setPosts(posts.map(post => {
        if(post.id === postId) {
            return {
                ...post,
                likes: post.likes + 1
            }
        }

        return post
    }));    
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 lg:p-24 gap-y-8">
        <header className='flex flex-row justify-center items-center bg-blue-700 w-full fixed top-0 z-10'>
            <span className='font-bold text-2xl py-5'>Proto Finsta</span>
        </header>
        {
            posts.map(post => {
                const user = users.find(user => user.id === post.userId)
                return <Card key={post.id} user={user} post={post} likePost={() => likePost(post.id)} />
            })
        }
    </main>
  )
}
