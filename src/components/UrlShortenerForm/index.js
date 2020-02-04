import React, { useState } from 'react';
import api from '../../services/api';
import validateUrl from '../../helpers/validateUrl';
import UrlShortened from '../../components/UrlShortened';
import {AiOutlineLoading} from 'react-icons/ai';

function UrlShortenerForm() {
    const [shortUrl, setshortUrl] = useState([]);
    const [errorUrl, setErrorUrl] = useState();
    const [errorId, setErrorId] = useState();

    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl');
        const  customID = document.querySelector('#customID');
        const loading = document.querySelector('.js-loading-icon');

        loading.classList.remove('hide');

        if(longUrl.value === '' || !validateUrl(longUrl.value)) {
            longUrl.focus();
            setErrorUrl('Preencha a URL corretamente');
            loading.classList.add('hide');
            return;
        }

        const response = await api.post('/api/shorten', {
            longUrl: longUrl.value.includes('http://') || longUrl.value.includes('https://') ? longUrl.value : `http://${longUrl.value}`,
            customID: customID.value
        });

        if(response.status === 208) {
            setErrorId('Esse sufixo já existe, que tal testar outro?');
            customID.focus();
            loading.classList.add('hide');
        } else {
            setshortUrl([...shortUrl, response.data.shortUrl]);
            longUrl.value = "";
            customID.value = "";
            loading.classList.add('hide');
        }
    }

    return(
        <>
            <form className="form-grid" action="">
                <div className="form-field">
                    <label htmlFor="longUrl">Que url você quer encurtar? *</label>
                    <input type="url" id="longUrl" placeholder="Cole a url aqui" required onChange={ () => setErrorUrl('') } />
                    { errorUrl && <small className="error">{errorUrl}</small>}
                </div>

                <div className="form-field">
                    <label htmlFor="customID">Sufixo (opcional)</label>
                    <input type="text" id="customID" placeholder="ex.: InstaLink" onChange={ () => setErrorId('') }/>
                    { errorId && <small className="error">{errorId}</small> }
                </div>

                <button className="button-primary" type="submit" onClick={ handleSubmit }>
                    Encurtar url <AiOutlineLoading className="js-loading-icon loading-icon hide" size="1.5em"/>
                </button>
            </form>

            { shortUrl !== "" &&
                <div id="url-shortened">
                    { shortUrl.map((item, key) => (
                        <UrlShortened item={item} key={key}/>
                    )) }
                </div>
            }
        </>
    )
};

export default UrlShortenerForm;