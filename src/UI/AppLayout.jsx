import { Outlet } from 'react-router-dom';
import Header from './Panel/Header';
import useAuthorize from '../components/Auth/useAuthorize';

function AppLayout({ children, setIsOpen }) {

     useAuthorize();

    return (
        <div className="bg-gray-50" >

            <div>
                <Header
                    setIsOpen={setIsOpen}
                />
            </div>

            <div className="flex" >
                <div >
                    {children}
                </div>

                <div className="m-4 w-full" >
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default AppLayout;