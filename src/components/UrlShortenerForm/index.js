import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import validateUrl from '../../helpers/validateUrl';
import UrlShortened from '../../components/UrlShortened';
import {AiOutlineLoading} from 'react-icons/ai';
import Storage from '../../helpers/Storage';
import ReactGA from 'react-ga';

function UrlShortenerForm() {
    const [shortUrl, setshortUrl] = useState([]);
    const [errorUrl, setErrorUrl] = useState();
    const [errorId, setErrorId] = useState();

    useEffect(() => {
        if(Storage.get('urls')) {
            setTimeout(() => {
                setshortUrl(JSON.parse(Storage.get('urls')));
            }, 1000);   
        }
    },[]);

    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl');
        const customID = document.querySelector('#customID');
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

        const urlShortened = response.data.shortUrl;
        const urlOriginal = response.data.longUrl;
        const urlHash = response.data.urlCode;

        if(response.status === 208) {
            setErrorId('Esse sufixo já existe, que tal testar outro?');
            customID.focus();
            loading.classList.add('hide');

        } else {
            if (process.env.NODE_ENV === 'production') {
                if(customID.value !== '') {
                    ReactGA.event({
                        category: 'Url com sufixo',
                        action: 'Digitou um sufixo para a Url'
                    });
                } else {
                    ReactGA.event({
                        category: 'Url sem sufixo',
                        action: 'Não digitou um sufixo para a Url'
                    });
                }
            }
            
            setshortUrl([...shortUrl, { urlShortened, urlOriginal, urlHash }]);
            longUrl.value = "";
            customID.value = "";
            loading.classList.add('hide');

            if(shortUrl) {
                Storage.set('urls', JSON.stringify([{ urlShortened, urlOriginal, urlHash }, ...shortUrl]));
            }
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
                <div id="url-shortened" className="is-reversed">
                    { shortUrl.map((item, key) => (
                        <UrlShortened urlHash={item.urlHash} shortened={item.urlShortened} long={item.urlOriginal} key={key}/>
                    )) }
                </div>
            }
        </>
    )
};

export default UrlShortenerForm;