import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGalleryItem/GalleryItem.module.css';


export default function ImageGalleryItem({imgArr, onImageClick}) {
    return imgArr.map((elem) => (
            <li className={style.ImageGalleryItem} key={elem.id}>
                <img
                    src={elem.webformatURL}
                    alt={elem.tags}
                    onClick={onImageClick}
                    className={style.ImageGalleryItem_image} />
            </li>
        ));
}


ImageGalleryItem.propTypes = {
    imgArr: PropTypes.array,
    onImageClick: PropTypes.func,
}
