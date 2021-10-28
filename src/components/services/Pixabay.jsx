import axios from 'axios';

export default function PixabayFetch(searchQuery, page) {
    const BASE_URL = `https://pixabay.com/api/`;
    const API_KEY = `23035596-1a90b7391e585725696c71550`;
    const perPage = 12;
    
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&key=${API_KEY}&per_page=${perPage}`;
        return axios
            .get(url)
            .then((result) => result.data  
            )            
            .catch((error) => {
                console.log(error);
                
            });
    }
