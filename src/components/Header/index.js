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
                        <h1>Precisa de uma url menor?</h1>
                        <p>Use os campos abaixo encurtar seus <strong>links grátis</strong> e compartilhe facilmente.</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;