import React from 'react';

// Components
import Header from '../../components/Header';
import UrlShortenerForm from '../../components/UrlShortenerForm';

// Assets
import '../../assets/sass/main.scss';

function Home() {
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