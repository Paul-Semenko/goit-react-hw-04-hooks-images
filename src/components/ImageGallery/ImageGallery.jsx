import {useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PixabayFetch from '../services/Pixabay';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import style from '../ImageGallery/ImageGallery.module.css';

 
export default function ImageGallery() {
    const [imgArr, setImgArr] = useState([]);
    const [status, setStatus] = useState("idle");
    const [showModal, setShowModal] = useState(false);
    const [largeImg, setLargeImg] = useState(null);
    const [page, setPage] = useState(1);
    const [searchImg, setSearchImg] = useState('');
    
    
    useEffect(() => {
        if (searchImg === '') {
            return;
        }
        setStatus('pending');
            
        PixabayFetch(searchImg, page)
        
            .then((data) => {
                if (data.hits.length > 0) {
                    setImgArr(data.hits);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            }
            )
            .catch((error) => {
                console.log(error);
                setStatus('error');
            });
               
          
    }, [searchImg]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        PixabayFetch(searchImg, page)
            .then((data) => {
                if (data.hits.length > 0) {
                    setImgArr((prev) => [...prev, ...data.hits]);
                    setStatus('success');
                    onPageScroll();
                } else {
                    setStatus('error');
                }
            }).catch((error) => {
                setStatus('error');
            });
        
    },[page]);
          
    const onPageScroll=()=>{
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: "smooth",
    });
    };

    const toggleModal = () => {
    setShowModal(!showModal);
    };
    
     const onImageClick = (e) => {
    e.preventDefault();
    let src = e.target.src;
    setLargeImg(imgArr.find((el) => el.webformatURL === src),
    );
    toggleModal();
    };
    return <>
        <Searchbar onSubmit={(data) => { setSearchImg(data); setPage(1); }} />
        {(status === "idle") && <h2 className={style.title}>Please, start typing your query!</h2>
        }
        {(status === "pending")&&<Loader
                    className={style.Loader}
                    type="Bars"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={9000} 
               />        
        }

        {(status === "success")&&
                <>
                    <ul className={style.ImageGallery}>
                        <ImageGalleryItem
                            imgArr={imgArr}
                            onImageClick={onImageClick}
                        />
                    </ul>
                   <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className={style.Button}>
            Load more
          </button>
                    {showModal && (
                        <Modal
                            toggleModal={toggleModal}
                            largeImg={largeImg}></Modal>
                    )}
                </>
        
    }
{(status === "error") &&<h2 className={style.Error_title}>Oh no, there are nothing to show you!</h2>
    }
    </>
}