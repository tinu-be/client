import React from 'react';
import Routes from './routes';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Poppins:400,600,700', 'sans-serif']
    }
});

function App() {
  return <Routes />;
}

export default App;
