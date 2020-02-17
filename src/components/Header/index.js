import React from 'react';
import logo from '../../assets/svgs/logo.svg';

function Header() {
    return(
        <>
            <header id="header">
                <div className="container">
                    <div className="header-logo">
                        <img src={logo} alt="tinu.be - encurtador de url" width="160"/> <span className="logo-label">beta</span>
                    </div>

                    <div className="header-content">
                        <h1>Encurtador de url, fácil e gratuito!</h1>
                        <p>Use os campos abaixo para <strong>encurtar seus links</strong> e compartilhe facilmente.</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;