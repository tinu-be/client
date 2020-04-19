import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// Components
import Header from '../../components/Header';
import UrlShortenerForm from '../../components/UrlShortenerForm';

// Assets
import { FaHeart } from "react-icons/fa";
import '../../assets/sass/main.scss';

function Home() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
            ReactGA.pageview('/');
        }
    },[])

    return (
        <>
            <div className="hero">
                <Header />
                
                <div className="container">
                    <UrlShortenerForm />
                </div>
            </div>

            <footer>
                <p><strong>tinu.be</strong> é um serviço 100% gratuito. Criado com <FaHeart className="copyright-icon" /> por <a rel="noopener noreferrer" href="https://itbruno.com.br?ref=tinu.be" target="_blank">Bruno Rodrigues</a>.</p>
            </footer>
        </>
    );
}

export default Home;