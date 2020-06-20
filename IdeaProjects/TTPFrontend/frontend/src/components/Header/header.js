import React from 'react';
import logo from '../Header/logo.jpg';
import '../Header/style.css'

const Header = () => {
    return(
        <div className="navbar">
            <img id="logo" src={logo} alt="Faculty Logo"/>
            <a className="navbar-title" href="/">Главная</a>
            <a className="navbar-title" href="/search">Поиск</a>
        </div>
    )
}

export default Header;