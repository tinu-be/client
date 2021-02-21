import React from 'react';
import Logo from '../../assets/svgs/logo';

function Header() {
    return(
        <>
            <header id="header">
                <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="container">
                    <div className="header-logo">
                        <div>
                            <Logo width="160" />
                        </div>
                        <div className="alert">
                            <h2>NOVO</h2> Agora você pode gerar QR Code das suas URLs
                        </div>
                    </div>

                    <div className="header-content fade-in-up">
                        <h1>Encurtador de url e gerador de QR Code</h1>
                        <h2>Encurte seus links, gere o QR Code e veja quantas pessoas acessaram em um só lugar.</h2>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;