import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// Components
import Header from '../../components/Header';
import UrlShortenerForm from '../../components/UrlShortenerForm';

// Assets
import '../../assets/sass/main.scss';

function Home() {
    useEffect(() => {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
        ReactGA.pageview('/');
    },[])

    return (
        <>
            <div className="container">
                <Header />
                <UrlShortenerForm />
            </div>
        </>
    );
}

export default Home;