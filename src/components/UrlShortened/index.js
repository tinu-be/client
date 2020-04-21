import React from 'react';

// Vendors
import swal from '@sweetalert/with-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Icons
import { MdContentCopy } from 'react-icons/md';
import { GoGraph } from "react-icons/go";
import { AiOutlineLoading } from 'react-icons/ai';

// Service
import api from '../../services/api';

function UrlShortened(props) {
    
    function isLoading(status, el) {
        if(status === true) {
            el.children[0].classList.remove('hide');
            el.children[1].classList.add('hide');
        } else {
            el.children[0].classList.add('hide');
            el.children[1].classList.remove('hide');
        }
    }

    async function handleStats(el) {
        el.preventDefault();
        const button = el.currentTarget;
        isLoading(true, button);

        const hash = button.getAttribute('data-hash');
        const response = await api.get(`${hash}/stats`);

        const info = response.data;
        
        if(response.status === 200) {
            isLoading(false, button);

            swal({
                title: "Quantidade de cliques",
                content: (<p className="alert-clicks-number">{info.clicks < 9 ? `0${info.clicks}` : info.clicks}</p>)
            })
        }
        
    }
    return(
        <>
            <div className={`shorturl ${props.customClass ? props.customClass : ''}`}>
                <div className="shorturl-output is-long">
                    <span className="label">Url original:</span>
                    <span className="url">{props.long}</span>
                </div>
                
                <div className="shorturl-output is-short">
                    <span className="label">Url encurtada:</span>
                    <a href={props.shortened} target="_blank" rel="noopener noreferrer" className="url">{props.shortened}</a>
                </div>

                <div className="shorturl-actions">
                    <button className="button-secondary is-empty" data-hash={props.urlHash} onClick={ (el) => handleStats(el) }>
                        <AiOutlineLoading className="js-loading-graph loading-icon hide" size="1.5em"/>
                        <GoGraph className="js-loading-graph" size="1.5em" />
                    </button>
                    <CopyToClipboard text={props.shortened} onCopy={ props.onCopy }>
                        <button className="button-secondary">
                            <MdContentCopy size="1.5em" /> Copiar
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </>
    )
}

export default UrlShortened;