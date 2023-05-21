import React from 'react';
import logo from '../images/logo.svg'

function Header() {
    return (
        <div className='header'>
        <img src={logo} className="logo" alt="Логотип Mesto Russia" />
        </div>
    );
}

export default Header;
