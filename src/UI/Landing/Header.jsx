
import HeaderLanding from '../../components/Landing/HeaderLanding';
import HeaderMobile from '../../components/Landing/HeaderMobile';
import useMediaQuery from '../../hooks/useMediaQuery';

function Header() {


    const isResponsive = useMediaQuery("(min-width: 760px)")

    return (
        <div className="flex justify-between bg-white shadow text-center items-center 2xl:container 2xl:mx-auto" >

            {isResponsive ? <HeaderLanding /> : <HeaderMobile />}

        </div>
    )
}

export default Header;