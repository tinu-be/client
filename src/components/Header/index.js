import React from 'react';
import Logo from '../../assets/svgs/logo';

function Header() {
    return(
        <>
            <header id="header">
                <div className="container">
                    <div className="header-logo">
                        <div>
                            <Logo width="160" /> <span className="logo-label">beta</span>
                        </div>
                        <a className="alert" rel="noopener noreferrer" target="_blank" href="https://tinu.be/coronavirus">
                            <h2>Coronavirus</h2> Proteja-se seguindo as orientações oficiais para prevenção.
                        </a>
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