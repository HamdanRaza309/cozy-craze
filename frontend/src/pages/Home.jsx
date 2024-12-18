import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import Achievements from '../components/Achievements';

function Home() {
    return (
        <div className='mt-2 md:mt-5'>
            <Hero />
            <LatestCollection />
            <Achievements />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
        </div>
    );
}

export default Home;