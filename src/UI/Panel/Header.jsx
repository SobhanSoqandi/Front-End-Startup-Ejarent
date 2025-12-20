
import { BiUser } from 'react-icons/bi'
import { IoMenu } from 'react-icons/io5'
import useUser from '../../features/User/useUser'
import Loading from '../Loading';

function Header({ setIsOpen }) {

    const { isLoading , isError, error, user } = useUser();

    return (
        <div className="bg-white shadow rounded-xl m-2 " >

            <div className="flex text-center items-center" >

                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="p-2 mx-2" >
                    <IoMenu className="text-2xl" />
                </button>


                <div className="bg-gray-50 p-1 rounded-full shadow">
                    <BiUser className="text-2xl" />
                </div>

                <div className="text-sm text-gray-600 px-3">

                    {isLoading && <Loading size="small" /> }

                    {isError && " لطفا ابتدا وارد شوید "}

                    {!isLoading && !isError && user && (
                        <h2>{user.name}</h2>
                    )}

                </div>





            </div>

        </div>
    )
}

export default Header