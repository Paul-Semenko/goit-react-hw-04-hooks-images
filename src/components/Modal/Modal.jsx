import { useEffect} from 'react';
import PropTypes from 'prop-types';
import style from '../Modal/Modal.module.css';

export default function Modal({ toggleModal, largeImg, tags}) {
    useEffect(() => {
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    });

    const handleEsc = (e) => {
        if (e.code === "Escape") {
            toggleModal();
        }
    };
    const handleClose = (e) => {
        if (e.currentTarget === e.target) {
            toggleModal();
        }
    };

    return (<div className={style.Overlay} onClick={handleClose}>
            <div className={style.Modal}>
                <img
                    src={largeImg.largeImageURL}
                    alt={tags} />
            </div>
        </div>);
};


Modal.propTypes = {
    toggleModal: PropTypes.func,
    largeImg: PropTypes.object,
}