import React, { useState } from 'react';
import api from '../../services/api';

function Home() {
    const [shortUrl, setshortUrl] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl').value;
        const  customID = document.querySelector('#customID').value;

        const response = await api.post('/api/shorten', {
            longUrl,
            customID
        });

        const { shortUrl } = response.data;

        if(response.status === 208) {
            setshortUrl('Este sufixo já existe, tente outro.');
        } else {
            setshortUrl(shortUrl);
        }
    }

    return (
        <>
            <form>
                <label htmlFor="longUrl">URL</label>
                <input type="text" id="longUrl" placeholder="Cole a url aqui"/>

                <label htmlFor="customID">Crie um sufixo customizado</label>
                <input type="text" id="customID" placeholder="ID customizado"/>

                <button onClick={ handleSubmit }>Encurtar url</button>
            </form>

            <div id="url-shortened">
                { shortUrl }
            </div>
        </>
    );
}

export default Home;