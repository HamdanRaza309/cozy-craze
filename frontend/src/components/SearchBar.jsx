import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);

    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center p-3">
            <div className="flex items-center justify-between border border-gray-400 px-3 py-2 mx-auto rounded-full w-full max-w-lg">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-sm sm:text-base"
                    type="text"
                    placeholder="Search"
                />
                <FontAwesomeIcon
                    icon={faXmark}
                    className="ml-3 w-6 sm:w-8 text-gray-500 cursor-pointer"
                    onClick={() => setShowSearch(false)}
                />
            </div>
        </div>
    ) : null;
}

export default SearchBar;
