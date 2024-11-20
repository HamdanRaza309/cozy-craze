import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [location])


    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-2/3 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
                <FontAwesomeIcon icon={faSearch} className='w-4' />
            </div>
            <FontAwesomeIcon onClick={() => setShowSearch(false)} icon={faXmark} className='inline w-3 cursor-pointer' />
        </div>
    ) : null
}

export default SearchBar