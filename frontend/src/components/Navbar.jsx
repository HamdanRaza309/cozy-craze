import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, setToken, setCartItems } = useContext(ShopContext);
    const [bgColor, setBgColor] = useState('bg-white');
    const [textColor, setTextColor] = useState('text-gray-800');
    const [hoverTextColor, setHoverTextColor] = useState('hover:text-yellow-500');
    const [height, setHeight] = useState('h-24');
    const [logo, setLogo] = useState(assets.logo1);

    const logout = async () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    useEffect(() => {
        const handleScrollEvent = () => {
            if (window.scrollY >= 100) {
                setBgColor('bg-yellow-400');
                setTextColor('text-white');
                setHoverTextColor('hover:text-gray-800');
                setHeight('h-20');
                setLogo(assets.logo2);
            } else {
                setBgColor('bg-white');
                setTextColor('text-gray-800');
                setHoverTextColor('hover:text-yellow-500');
                setHeight('h-24');
                setLogo(assets.logo1);
            }
        };

        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    return (
        <div className={`sticky top-0 z-20 ${bgColor} ${textColor} ${height} flex items-center justify-around shadow-md px-6 transition-all duration-300`}>
            {/* Logo */}
            <Link to='/'>
                <img
                    className='w-28 h-10 sm:w-36 sm:h-12 lg:w-44 lg:h-14'
                    src={logo}
                    alt="logo"
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 text-sm lg:text-base">
                {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={`transition duration-300 ${hoverTextColor} hover:underline hover:underline-offset-4`}
                    >
                        {item}
                    </NavLink>
                ))}
            </ul>

            {/* Icons and Menu for Mobile */}
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search Icon */}
                <FontAwesomeIcon
                    onClick={() => setShowSearch(true)}
                    icon={faSearch}
                    className={`text-2xl cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
                />

                {/* Profile Dropdown */}
                <div className="group relative">
                    <FontAwesomeIcon
                        icon={faUser}
                        className={`text-2xl cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
                    />
                    <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 w-36 bg-white text-gray-700 p-3 rounded-md shadow-lg border">
                        <p className='cursor-pointer hover:text-gray-900'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-gray-900'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-gray-900'>Logout</p>
                    </div>
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className="relative">
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className={`text-2xl cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
                    />
                    <p className='absolute -right-2 -bottom-2 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Mobile Menu Icon */}
                <FontAwesomeIcon
                    onClick={() => setVisible(true)}
                    icon={faBars}
                    className={`w-6 text-2xl md:hidden cursor-pointer ${hoverTextColor}`}
                />
            </div>

            {/* Sidebar Menu for Mobile */}
            <div className={`fixed top-0 bottom-0 right-0 z-30 bg-white transition-all duration-300 ease-in-out ${visible ? 'w-3/4 sm:w-2/4' : 'w-0'} overflow-hidden`}>
                <div className="flex flex-col text-gray-800 h-full">
                    {/* Close Icon */}
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-4 cursor-pointer bg-gray-100 border-b"
                    >
                        <FontAwesomeIcon className='h-4 rotate-180' icon={faAngleRight} />
                        <p>Back</p>
                    </div>

                    {/* Sidebar Links */}
                    {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                        <NavLink
                            key={item}
                            onClick={() => setVisible(false)}
                            to={`/${item.toLowerCase()}`}
                            className="py-4 px-6 text-lg border-b border-gray-200 hover:bg-gray-100"
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
