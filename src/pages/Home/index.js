import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// Components
import Header from '../../components/Header';
import UrlShortenerForm from '../../components/UrlShortenerForm';

// Assets
import anchorShape from '../../assets/svgs/anchor-shape.svg';

// Assets
import '../../assets/sass/main.scss';

function Home() {
    useEffect(() => {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
        ReactGA.pageview('/');
    },[])

    return (
        <>
            <div className="hero">
                <img src={anchorShape} className="anchor-shape" width="460"/>
                <Header />
                
                <div className="container">
                    <UrlShortenerForm />
                </div>
            </div>
        </>
    );
}

export default Home;