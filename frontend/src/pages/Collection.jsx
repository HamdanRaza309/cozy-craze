import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';

function Collection() {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevent')

    // Filter Products by Category
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev => prev.filter(item => item !== e.target.value)))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    // Filter Products by subCategory
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev => prev.filter(item => item !== e.target.value)))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productCopy = productCopy.filter((item => category.includes(item.category)))
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter((item => subCategory.includes(item.subCategory)))
        }

        setFilterProducts(productCopy)
    }

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch, products])

    // Sort Products
    const sortProducts = () => {
        let filterProductsCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price))
                break;

            case 'high-low':
                setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price))
                break;

            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        sortProducts();
    }, [sortType])

    return (
        <>
            <div className="flex flex-col min-h-[500px] lg:flex-row justify-between items-center bg-white p-8 rounded-lg shadow-lg">
                {/* Left Section - Text */}
                <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-yellow-500 text-sm font-medium">Fashion Closet</h3>
                    <h1 className="text-4xl font-bold text-blue-500">
                        New Collections <br /> For You
                    </h1>
                    <p className="text-gray-500">
                        Phaesellus sed elit efficitur, gravida libero sit amet, scelerisque mauris.
                        Vivamus ornare augue lorem at volutpat.
                    </p>
                    <button className="btnForWhiteBg">
                        <Link to={'/about'}>
                            ABOUT US
                        </Link>
                    </button>
                </div>

                {/* bubbles */}
                <div className="hidden lg:block">
                    <p className='relative top-0 left-20 bg-yellow-400 w-20 h-20 rounded-full'></p>
                    <p className='relative bottom-32 right-10 bg-blue-500 w-24 h-24 rounded-full'></p>
                    <p className='relative bottom-20 right-10 bg-yellow-400 w-32 h-32 rounded-full'></p>
                    <p className='relative bottom-0 right-0 bg-blue-500 w-12 h-12 rounded-full'></p>
                    <p className='relative top-6 right-40 bg-yellow-400 w-14 h-14 rounded-full'></p>
                </div>

                {/* Right Section - Image */}
                <div className="relative lg:w-1/2 flex justify-center lg:mt-0 mt-10">
                    <img
                        src={assets.collection_img}
                        alt="Lady Model"
                        className="w-6/7 min-h-[400px] rounded-lg"
                    />

                    {/* Overlay Elements */}
                    <div className="hidden sm:block absolute bottom-3 left-0 lg:left-10 bg-white p-2 rounded-full shadow-md">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs lg:text-sm font-medium text-yellow-500">Customer Ratings</span>
                            <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 lg:bottom-14 lg:right-10 bg-white p-2 rounded-full shadow-md">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs lg:text-sm font-medium text-yellow-500">100% Secure Payment</span>
                            <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                {/* Left Side */}
                {/* Filter Options */}
                <div className="min-w-60">
                    <p onClick={() => setShowFilter(!showFilter)} className='cursor-pointer gap-2 items-center my-2 text-xl'>FILTERS
                        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
                    </p>

                    {/* Category Filters */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
                        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Men`} onChange={toggleCategory} /> Men
                            </p>
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Women`} onChange={toggleCategory} /> Women
                            </p>
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Kids`} onChange={toggleCategory} /> Kids
                            </p>
                        </div>
                    </div>
                    {/* Sub-Category Filters */}
                    <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilter ? '' : 'hidden'}`}>
                        <p className='mb-3 text-sm font-medium'>TYPE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Topwear`} onChange={toggleSubCategory} /> Topwear
                            </p>
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Bottomwear`} onChange={toggleSubCategory} /> Bottomwear
                            </p>
                            <p className="flex gap-2">
                                <input className='w-3' type="checkbox" value={`Winterwear`} onChange={toggleSubCategory} /> Winterwear
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1={'ALL'} text2={'COLLECTIONS'} />

                        {/* Product Sort */}
                        <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                            <option value="relevent">Sort by: Relevent</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {/* Map Products */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {
                            filterProducts.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    id={item._id}
                                    images={item.images}
                                    name={item.name}
                                    price={item.price}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Collection