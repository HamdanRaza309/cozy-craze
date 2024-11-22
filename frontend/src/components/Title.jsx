import React from 'react'

function Title({ text1, text2 }) {
    return (
        <div className="inline-flex gap-2 text-3xl items-center mb-3">
            <p className='text-gray-700'>{text1} <span className='text-blue-500 font-bold'>{text2}</span></p>
            <p className='w-1 sm:w-1 h-[4px] bg-blue-500'></p>
            <p className='w-8 sm:w-11 h-[4px] bg-blue-500'></p>
        </div>
    )
}

export default Title