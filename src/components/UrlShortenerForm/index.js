import React, { useState, useEffect } from 'react';

// Vendors
import ReactGA from 'react-ga';

// Components and helpers
import UrlShortened from '../../components/UrlShortened';

// Helpers and assets
import validateUrl from '../../helpers/validateUrl';
import Storage from '../../helpers/Storage';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdCheck } from 'react-icons/md';

// Service
import api from '../../services/api';

function UrlShortenerForm() {
    const [shortUrl, setshortUrl] = useState([]);
    const [errorUrl, setErrorUrl] = useState();
    const [errorId, setErrorId] = useState();
    const [btnLoadUrls, setbtnLoadUrls] = useState('Mostrar mais +');
    const [urlsVisible, setUrlsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check if exists url stored into localstorage and set to state
        if(Storage.get('tinube_urls')) {
            setTimeout(() => {
                setshortUrl(JSON.parse(Storage.get('tinube_urls')));
            }, 1000);   
        }
    },[shortUrl, btnLoadUrls]);

    // Call api to post new short-url
    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl');
        const customID = document.querySelector('#customID');
        const loading = document.querySelector('.js-loading-icon');

        loading.classList.remove('hide');

        // Check Suffix
        const suffixRule = new RegExp(/^[a-zA-Z0-9-#_]*$/);
        if(customID !== "" && !suffixRule.test(customID.value) ) {
            customID.focus();
            setErrorId('Tente sem caracteres especiais 😉');
            loading.classList.add('hide');

            return false;
        }
        
        // Check if longUrl
        if(longUrl.value === '' || !validateUrl(longUrl.value)) {
            longUrl.focus();
            setErrorUrl('Não encontramos a url, vamos tentar outra? 😁');
            loading.classList.add('hide');

            return;
        }

        // Call api to post new url
        const response = await api.post('/api/shorten', {
            longUrl: longUrl.value.includes('http://') || longUrl.value.includes('https://') ? longUrl.value : `http://${longUrl.value}`,
            customID: customID.value
        });

        const urlShortened = response.data.shortUrl;
        const urlOriginal = response.data.longUrl;
        const urlHash = response.data.urlCode;

        // Check custom suffix 
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
            
            // Set urls cerated in lcoalstorage
            if(shortUrl) {
                Storage.set('tinube_urls', JSON.stringify([{ urlShortened, urlOriginal, urlHash }, ...shortUrl]));
            }
        }
    }

    // Handle 'Copied URL' event when click in 'Copy' button
    function handleCopy() {
        setCopied(true);

        var changeState = setTimeout(() => {
            setCopied(false);
        }, 800);

        return changeState;
    }

    // Action to load more Urls
    function handleLoadMoreUrls() {
        setbtnLoadUrls('Mostrar menos -');
        
        const hiddenUrls = [...document.querySelectorAll('.shorturl.is-extra')];

        if(!urlsVisible) {
            hiddenUrls.map(el => el.classList.remove('hide'));
            setUrlsVisible(true);
        } else {
            hiddenUrls.map(el => el.classList.add('hide'));
            setbtnLoadUrls('Mostrar mais +');
            setUrlsVisible(false);
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
                    <input type="text" id="customID" placeholder="ex.: InstaLink" maxLength="20" onChange={ () => setErrorId('') }/>
                    { errorId && <small className="error">{errorId}</small> }
                </div>

                <button className="button-primary" type="submit" onClick={ handleSubmit }>
                    Encurtar url <AiOutlineLoading className="js-loading-icon loading-icon hide" size="1.5em"/>
                </button>
            </form>

            { shortUrl !== "" &&
                <div id="url-shortened">
                    { shortUrl.map((item, key) => (
                        <UrlShortened onCopy={handleCopy} urlHash={item.urlHash} customClass={ key >= 4 && !urlsVisible ? 'is-extra hide' : '' } shortened={item.urlShortened} long={item.urlOriginal} key={key}/>
                    )) }
                    <>
                        { shortUrl.length > 4 && (
                            <button className="button-loadmore" onClick={ handleLoadMoreUrls }>{ btnLoadUrls }</button>
                        )}
                    </>
                </div>
                
            }

            <div className={ 'clipboard-copied ' + (copied ? 'is-visible' : '')}>
                <MdCheck size="2em"/> Link copiado!
            </div>
        </>
    )
};

export default UrlShortenerForm;