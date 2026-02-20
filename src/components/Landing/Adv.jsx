import React from 'react'
import truncateText from "../../utils/truncateText";
import { useNavigate } from 'react-router-dom';

function Adv({ Advertisement }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/adv/${Advertisement.id}`);
    };

    const firstImage = Advertisement.images && Advertisement.images.length > 0
        ? Advertisement.images[0].image_path
        : 'images/defualt-image.jpg';


    return (
        // md ? flex-row : flex-col
        <div
            onClick={handleClick}
            className="sm:shadow flex sm:flex-col hover:shadow-blue-500 sm:rounded-lg p-2 sm:m-2 border-b border-b-gray-300 mx-4 sm:w-full " >

            <div className="w-32 sm:w-full " >
                <img className="rounded-xl w-full h-44"
                    src={
                        firstImage?.includes('defualt-image')
                            ? firstImage
                            : `http://localhost:8000/${firstImage}`
                    }
                    alt="" />
            </div>

            <div className="p-2 space-y-2 w-52 " >
                <h2 className="font-bold" > {truncateText(Advertisement.title, 50)} </h2>



                <div className="flex gap-x-1" >
                    {
                        Advertisement.price
                            ?
                            <>
                                <p> {Advertisement.price} </p>
                                <i className="font-[lalezar]"  > تومان </i>
                            </>
                            :
                            " توافقی "
                    }
                </div>
                <p className="text-gray-400 text-sm " > {Advertisement.categories} , {Advertisement.address} </p>
            </div>

        </div>
    )
}

export default Adv