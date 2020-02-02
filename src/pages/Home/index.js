import React, { useState } from 'react';
import api from '../../services/api';

// Components
import Header from '../../components/Header';

// Assets
import '../../assets/sass/main.scss';

function Home() {
    const [shortUrl, setshortUrl] = useState([]);
    
    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl').value;
        const  customID = document.querySelector('#customID').value;

        const response = await api.post('/api/shorten', {
            longUrl,
            customID
        });

        if(response.status === 208) {
            alert('Sufixo já existe');
        } else {
            setshortUrl([...shortUrl, response.data.shortUrl]);
        }
    }

    return (
        <>
            <div className="container">
                <Header />
                <form className="form-grid">
                    <div className="form-field">
                        <label htmlFor="longUrl">URL *</label>
                        <input type="url" id="longUrl" placeholder="Cole a url aqui" required/>
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="customID">Sufixo (opcional)</label>
                        <input type="text" id="customID" placeholder="ID customizado"/>
                    </div>
                    

                    <button className="button-primary" type="submit" onClick={ handleSubmit }>Encurtar url</button>
                </form>

                <div id="url-shortened">
                    { shortUrl.map( item => (
                        <div key={item.index} className="shorturl">
                            <a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
                        </div>
                    )) }
                </div>
            </div>
        </>
    );
}

export default Home;