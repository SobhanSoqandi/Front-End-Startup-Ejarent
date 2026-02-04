import React from 'react'

function Advertisements({AdvertisementsOject}) {

    return (
        <>
            {
                AdvertisementsOject.map((Advertisement) => (
                    <div>
                        <h2> {Advertisement.name} </h2>
                        <p> {Advertisement.price} </p>
                        <p> {Advertisement.categories} </p>
                    </div>
                ))
            }
        </>
    )
}

export default Advertisements;