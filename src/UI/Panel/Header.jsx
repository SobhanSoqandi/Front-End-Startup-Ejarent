
import { BiUser } from 'react-icons/bi'
import { IoMenu } from 'react-icons/io5'
import useUser from '../../features/User/useUser'
import Loading from '../Loading';
import ToPersianNumber from "../../Utils/ToPersianNumber"
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

function Header({ setIsOpen }) {

    const navigate = useNavigate();

    const { isLoading, isError, error, user } = useUser();

    return (
        <div className="flex justify-between text-center items-center bg-white shadow rounded-xl m-2 " >



            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm 
                rounded-2xl p-1 border-gray-100">




                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="p-2.5 hover:bg-gray-100 rounded-xl transition-all 
               duration-200 text-gray-600 hover:text-gray-900"
                >
                    <IoMenu className="text-2xl" />
                </button>

                <div className="w-px h-8 bg-gray-200" />

                <div className="flex items-center">

                    <div className="bg-gradient-to-br from-blue-400 to-blue-800 
                    p-2 rounded-xl shadow-md">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-5 h-5 rounded-lg object-cover"
                            />
                        ) : (
                            <BiUser className="text-xl text-white" />
                        )}
                    </div>

                    {/* متن وضعیت */}
                    <div className="min-w-[100px]">
                        {isLoading && (
                            <div className="flex items-center gap-2">
                                <Loading size="small" />
                            </div>
                        )}


                        {!isLoading && !isError && user && (
                            <div className="flex flex-col">

                                <span className="text-sm font-semibold text-gray-800 truncate max-w-[100px]">
                                    {user.name}
                                </span>
                                <span className="text-xs text-gray-400"> {ToPersianNumber(user.phoneNumber)} </span>

                            </div>
                        )}
                    </div>
                </div>



                <button 
                onClick={() => navigate("complete-profile")}
                className="cursor-pointer" >
                    <HiMiniPencilSquare className="text-xl text-blue-600" />
                </button>


            </div>

           

        </div>
    )
}

export default Header