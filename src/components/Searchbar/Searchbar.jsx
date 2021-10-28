import{useState} from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import style from '../Searchbar/search.module.css';



export default function Searchbar({ onSubmit }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = event => {
        setSearchValue(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchValue.trim() === '') {
            toast.error('enter something to start searching');
            return;
        }
        onSubmit(searchValue);
        setSearchValue('');
        }

    return (
            <header className={style.Searchbar}>
                <form className={style.SearchForm}
                    onSubmit={handleSubmit}>
                    <button type="submit" className={style.SearchFormbutton}>
                        <span className={style.SearchForm_button_label}>Search</span>
                    </button>

                    <input
                        className={style.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                </form>
            </header>
            
        );
        
};
 


Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}





