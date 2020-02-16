import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MdContentCopy, MdCheck } from 'react-icons/md';

function UrlShortened(props) {
    const [copied, setCopied] = useState(false)

    function handleCopy() {
        setCopied(true);

        var changeState = setTimeout(() => {
            setCopied(false);
        }, 800);

        return changeState;
    }

    return(
        <>
            <div className="shorturl">
                <div className="shorturl-output is-long">
                    <span className="label">Url original:</span>
                    <span className="url">{props.long}</span>
                </div>
                
                <div className="shorturl-output is-short">
                    <span className="label">Url encurtada:</span>
                    <a href={props.shortened} target="_blank" rel="noopener noreferrer" className="url">{props.shortened}</a>
                </div>

                <div className="shorturl-actions">
                    <CopyToClipboard text={props.shortened} onCopy={ handleCopy }>
                        <button className="button-copy">
                            <MdContentCopy size="1.5em" /> Copiar
                        </button>
                    </CopyToClipboard>
                </div>
            </div>

            <div className={ 'clipboard-copied ' + (copied ? 'is-visible' : '')}>
                <MdCheck size="2em"/> Link copiado!
            </div>
        </>
    )
}

export default UrlShortened;