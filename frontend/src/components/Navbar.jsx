import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';

function Navbar() {

    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, setToken, setCartItems } = useContext(ShopContext)
    const [bgColor, setBgColor] = useState('bg-white');
    const [textColor, setTextColor] = useState('text-black');
    const [hoverTextColor, setHoverTextColor] = useState('hover:text-yellow-300');
    const [height, setHeight] = useState('h-28');
    const [logo, setLogo] = useState(assets.logo1);

    const logout = async () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    useEffect(() => {
        const handleScrollEvent = () => {
            if (window.scrollY >= 100) {
                setBgColor('bg-yellow-400');
                setTextColor('text-white');
                setHoverTextColor('hover:text-black');
                setHeight('h-20');
                setLogo(assets.logo2);
            } else {
                setBgColor('bg-white');
                setTextColor('text-black');
                setHoverTextColor('hover:text-yellow-300');
                setHeight('h-28');
                setLogo(assets.logo1);
            }
        };

        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <div className={`sticky top-0 z-20 ${bgColor} ${textColor} ${height} flex items-center justify-between border-b font-medium px-4 md:px-8 lg:px-12 transition-all duration-300 ease-in-out`}>
            {/* Logo */}
            <Link to='/'>
                <img
                    className='w-24 h-8 sm:w-32 sm:h-10 lg:w-40 lg:h-12'
                    src={logo}
                    alt="logo"
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-5 text-sm lg:text-base">
                {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={`flex flex-col gap-1 items-center ${hoverTextColor} transition duration-300 hover:scale-105`}
                    >
                        <p>{item}</p>
                        <hr className='w-2/4 border-none h-[1.5px] hidden' />
                    </NavLink>
                ))}
            </ul>

            {/* Icons and Menu for Mobile */}
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search Icon */}
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    alt="search_icon"
                    className={`w-5 cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
                />

                {/* Profile Dropdown */}
                <div className="group relative">
                    <img src={assets.profile_icon} alt="profile_icon" className='w-5 cursor-pointer' />
                    <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 w-36 bg-gray-100 p-3 text-gray-600 rounded-md shadow-lg">
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className={`relative w-5 cursor-pointer ${hoverTextColor}`}>
                    <img src={assets.cart_icon} alt="cart_icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Menu Icon for Small Screens */}
                <img onClick={() => { setVisible(true) }} src={assets.menu_icon} alt="menu_icon" className={`w-5 cursor-pointer md:hidden ${hoverTextColor}`} />
            </div>

            {/* Sidebar Menu for Mobile */}
            <div className={`fixed top-0 bottom-0 right-0 z-30 bg-white transition-all duration-300 ease-in-out ${visible ? 'w-3/4 sm:w-2/4' : 'w-0'} overflow-hidden`}>
                <div className="flex flex-col text-gray-700 h-full">
                    {/* Close Icon */}
                    <div onClick={() => { setVisible(false) }} className="flex items-center gap-4 p-4 cursor-pointer bg-gray-200">
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="dropdown_icon" />
                        <p>Back</p>
                    </div>

                    {/* Sidebar Links */}
                    {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                        <NavLink
                            key={item}
                            onClick={() => { setVisible(false) }}
                            to={`/${item.toLowerCase()}`}
                            className='py-4 px-6 text-lg border-b border-gray-200 hover:bg-gray-100'
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar
