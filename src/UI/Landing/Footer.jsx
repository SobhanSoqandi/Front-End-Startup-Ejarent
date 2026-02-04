import React from 'react'
import FooterLanding from '../../components/Landing/FooterLanding';
import FooterMobileMenu from '../../components/Landing/FooterMobileMenu';
import useMediaQuery from '../../hooks/useMediaQuery';

function Footer() {

  const isResponsive = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {
        isResponsive ? <FooterLanding /> : <FooterMobileMenu />
      }

    </>
  )
}

export default Footer;