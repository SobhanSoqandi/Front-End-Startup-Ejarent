import { Outlet } from 'react-router-dom';
import Header from './Panel/Header';
import useAuthorize from '../components/Auth/useAuthorize';
import FooterMobileMenu from '../components/Landing/FooterMobileMenu';
import Footer from '../UI/Landing/Footer';


function AppLayout({ children, setIsOpen }) {

    useAuthorize();

    return (
        <div className="min-h-screen flex flex-col">

            <Header setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div className="flex flex-grow">
                <div>
                    {children}
                </div>

                <div className="m-4 w-full">
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <div className="text-center z-50">
                <Footer />
            </div>

        </div>
    )
}

export default AppLayout;