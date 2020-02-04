import React from 'react';

import logo from '../../assets/svgs/logo.svg';

function Header() {
    return(
        <>
            <header id="header">
                <img src={logo} alt="tinu.be - encurtador de url" width="160"/> 

                <h1>Encurtador de urls</h1>
                <p>Encurte links e compartilhe em seu Instagram, Facebook, WhatsApp...</p>
            </header>
        </>
    )
}

export default Header;