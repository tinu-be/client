import React from 'react';
import QRCode from 'qrcode';

// Vendors
import swal from '@sweetalert/with-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Icons
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineLoading, AiOutlineQrcode, AiOutlineBarChart } from 'react-icons/ai';

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
        try {
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
        } catch(err) {
            throw new Error(err);
        }
    }

    function handleQRcode(el) {
        el.preventDefault();
        
        const button = el.currentTarget;
        isLoading(true, button);

        QRCode.toDataURL(button.dataset.hash, {
            width: 600,
            color: {
              dark:"#020115",
              light:"#ffffff"
            }
        })
        .then(url => {
            isLoading(false, button);
            const output = (
                <div>
                    <img width="300" src={url} alt={button.dataset.hash} /><br/>
                    <a href={url} className="no-underline" download={`QR Code - from tinu.be`}>DOWNLOAD</a>
                </div>
            );

            swal({
                title: "Aponte sua câmera",
                content: output
            })
        })
        .catch(err => {
            isLoading(false, button);
            throw new Error(err);
        });
    }

    return(
        <>
            <div className={`shorturl ${props.customClass ? props.customClass : ''}`}>
                <div className="shorturl-output is-long">
                    <span className="label">Url original:</span>
                    <span title={props.long} className="url">{props.long}</span>
                </div>
                
                <div className="shorturl-output is-short">
                    <span className="label">Url encurtada:</span>
                    <a href={props.shortened} target="_blank" rel="noopener noreferrer" className="url">{props.shortened}</a>
                </div>

                <div className="shorturl-actions">
                    <button className="button-secondary is-empty" data-hash={props.shortened} onClick={ (el) => handleQRcode(el) }>
                        <AiOutlineLoading className="js-loading-qrcode loading-icon hide" size="1.5em"/>
                        <AiOutlineQrcode className="js-loading-qrcode" size="1.5em" />
                    </button>
                    <button className="button-secondary is-empty" data-hash={props.urlHash} onClick={ (el) => handleStats(el) }>
                        <AiOutlineLoading className="js-loading-graph loading-icon hide" size="1.5em"/>
                        <AiOutlineBarChart className="js-loading-graph" size="1.8em" />
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