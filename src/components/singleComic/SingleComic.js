import './singleComic.scss';
import useMarvelServices from '../services/getApi';
import { useEffect, useState } from 'react';

const SingleComic = ({id}) => {
    const {loading, error, getComic, clearError} = useMarvelServices();
    const [comic, setComic] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        let newComic = [];
        getComic(id)
            .then(data => setComic(data[0]))
    }

    return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pages}</p>
                <p className="single-comic__descr">{comic.language}</p>
                <div className="single-comic__price">{comic.price}$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;