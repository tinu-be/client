import React from 'react';

import logo from '../../assets/svgs/logo.svg';

function Header() {
    return(
        <>
            <header id="header">
                <img src={logo} alt="tinu.be - encurtador de url" width="160"/> <span className="logo-label">beta</span>

                <h1>Encurtador de urls</h1>
                <p>Encurte links e compartilhe facilmente em qualquer lugar e com quem quiser.</p>
            </header>
        </>
    )
}

export default Header;