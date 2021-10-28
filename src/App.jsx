import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import style from './App.module.css';


export default function App(searchValue) {
   
    return (
          
          <div className={style.App}>
            <ImageGallery
              searchValue={searchValue}
               
            />
            <ToastContainer autoClose={3000}
          
            />
          </div>
        );
};