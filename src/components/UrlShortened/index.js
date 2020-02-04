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
                <div className="shorturl-output">
                    <span>Url encurtada:</span>
                    <a href={props.item} target="_blank" rel="noopener noreferrer">{props.item}</a>
                </div>

                <div className="shorturl-actions">
                    <CopyToClipboard text={props.item} onCopy={ handleCopy }>
                        <button className="button-copy">
                            <MdContentCopy size="2em" /> Copiar
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