import React, { useState } from 'react';
import api from '../../services/api';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MdContentCopy, MdCheck } from 'react-icons/md';

import validateUrl from '../../helpers/validateUrl';

function UrlShortenerForm() {
    const [shortUrl, setshortUrl] = useState([]);
    const [errorUrl, setErrorUrl] = useState();
    const [errorId, setErrorId] = useState();
    const [copied, setCopied] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        const longUrl = document.querySelector('#longUrl');
        const  customID = document.querySelector('#customID');

        if(longUrl.value === '' || !validateUrl(longUrl.value)) {
            longUrl.focus();
            setErrorUrl('Preencha a URL corretamente');
            return;
        }

        const response = await api.post('/api/shorten', {
            longUrl: longUrl.value,
            customID: customID.value
        });

        if(response.status === 208) {
            setErrorId('Esse sufixo já existe, que tal testar outro?');
            customID.focus();
        } else {
            setshortUrl([...shortUrl, response.data.shortUrl]);
        }
    }

    function handleCopy() {
        setCopied(true);

        var changeState = setTimeout(() => {
            setCopied(false);
        }, 800);

        return changeState;
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

                <button className="button-primary" type="submit" onClick={ handleSubmit }>Encurtar url</button>
            </form>

            { shortUrl !== "" &&
                <div id="url-shortened">
                    { shortUrl.map( item => (
                        <div key={item} className="shorturl">
                            <div className="shorturl-output">
                                <span>Url encurtada:</span>
                                <a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
                            </div>

                            <div className="shorturl-actions">
                                <CopyToClipboard text={item} onCopy={ handleCopy }>
                                    <button className="button-copy">
                                        <MdContentCopy /> Copiar
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    )) }
                </div>
            }

            <div className={ 'clipboard-copied ' + (copied ? 'is-visible' : '')}>
                <MdCheck size="2em"/> Link copiado!
            </div>
        </>
    )
};

export default UrlShortenerForm;