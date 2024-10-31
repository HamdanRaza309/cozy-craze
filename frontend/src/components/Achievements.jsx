import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import Title from './Title';
import { assets } from '../frontend_assets/assets';

const Achievements = () => {
    const data = [
        {
            id: 1,
            icon: faDollarSign,
            title: 'Sales',
            value: '1M+',
            description: 'Sales Achieved',
        },
        {
            id: 2,
            icon: faUsers,
            title: 'Customers',
            value: '500k+',
            description: 'Happy Customers Worldwide',
        },
        {
            id: 3,
            icon: faStar,
            title: 'Reviews',
            value: '10k+',
            description: 'Positive Reviews Received',
        },
    ];

    return (
        <div className="bg-yellow-300 shadow-lg pt-12 pb-20">
            <div className="text-center px-6 md:px-10 lg:px-14 mb-16">
                <div className='text-3xl'>
                    <Title text1="OUR" text2="ACHIEVEMENTS" />
                </div>
                <p className="text-md md:text-lg lg:text-xl mt-4 text-gray-700 leading-relaxed">
                    Achievements that reflect our growth, customer satisfaction, and performance over the years.
                </p>
            </div>

            {/* Achievements Section */}
            <div className="flex flex-wrap justify-center items-start gap-12 px-4">
                {data.map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className={`flex flex-col lg:flex-row items-center w-full md:w-3/4 lg:w-1/2 p-8 border bg-blue-50 shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl rounded-lg ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                    >
                        <div className="text-center lg:text-left mb-6 lg:mb-0 lg:mr-6">
                            <FontAwesomeIcon
                                icon={achievement.icon}
                                size="3x"
                                className="text-yellow-500 mb-4 transform transition-transform duration-300 hover:rotate-12 hover:scale-110"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">{achievement.title}</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{achievement.value}</p>
                            <p className="text-md text-gray-600 mt-1">{achievement.description}</p>
                        </div>
                        <div className="relative overflow-hidden w-40 h-40 lg:w-48 lg:h-48 transform transition-transform duration-500 hover:rotate-3 hover:scale-105 rounded-lg">
                            <img src={assets.about_img} alt="achievement" className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
