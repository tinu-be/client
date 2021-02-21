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
                <p><strong>tinu.be</strong> é um serviço 100% gratuito e <a href="https://github.com/tinu-be" target="_blank" rel="noopener noreferrer">open-source</a>. Criado com <FaHeart className="copyright-icon" /> por <a rel="noopener noreferrer" href="https://itbruno.com.br/?utm_source=tinube&utm_medium=footer" target="_blank">Bruno Rodrigues</a>.</p>
            </footer>
        </>
    );
}

export default Home;