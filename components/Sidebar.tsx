import React from 'react';
import Image from 'next/image';
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'

import SidebarUserInfo from './SidebarUserInfo';
const Sidebar = () => {

    return (
        <nav className='h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20
        lg:mr-10'>
            <div className='relative h-full flex flex-col items-center'>
                <div className='py-3'>
                    <Image src={'/assets 15/busybee-logo2.png'} alt='Logo' width={48} height={48} />
                </div>

                <ul>
                    <SideBarLink Icon={HomeIcon} text='Home' />
                    <SideBarLink Icon={HashtagIcon} text='Explore' />
                    <SideBarLink Icon={BellIcon} text='Notifications' />
                    <SideBarLink Icon={InboxIcon} text='Messages' />
                    <SideBarLink Icon={BookmarkIcon} text='Bookmarks' />
                    <SideBarLink Icon={UserIcon} text='Profile' />
                    <SideBarLink Icon={EllipsisHorizontalCircleIcon} text='More' />
                    <button className='hidden xl:block bg-[#F4AF01] w-[200px] h-[52px] rounded-full text-white
                     font-medium cursor-pointer shadow-md mt-2
                     '>Bumble</button>
                </ul>
                <SidebarUserInfo />
            </div>
        </nav>
    );
}

export default Sidebar;

interface SidebarLinkProps {
    text: string;
    Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string;
        titleId?: string;
    } & React.RefAttributes<SVGSVGElement>>
}
function SideBarLink({ text, Icon }: SidebarLinkProps) {
    return (
        <li className='flex items-center space-x-3 text-xl mb-2 p-2.5'>
            <Icon className='h-7' />
            <span className='hidden xl:block'>{text}</span>
        </li>
    )
}