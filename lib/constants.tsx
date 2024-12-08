import { MdHomeFilled } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";


export const SideBarLinks = [
    {
        name: 'Home',
        href: '/',
        icon: <MdHomeFilled style={{fontSize: '20px'}} />
    },
    {
        name: 'Logs',
        href: '/logs',
        icon: <FaList />
    },
    {
        name: 'Users',
        href: '/users',
        icon: <FaUsers style={{fontSize: '18px'}} />
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: <IoMdSettings style={{fontSize: '18px'}} />
    },
]
