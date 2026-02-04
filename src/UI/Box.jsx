import React from 'react'

function Box({ titr, body , width }) {
    return (
        <div style={{ width: width }} className="flex flex-col justify-center shadow  border-gray-100 items-center p-3 rounded-xl grow">
            <div className="font-bold text-blue-600 text-lg 2xl:text-xl">{titr}</div>
            <div className="text-sm md:text-lg lg:text-sm 2xl:text-lg">{body}</div>
        </div>
    )
}

export default Box