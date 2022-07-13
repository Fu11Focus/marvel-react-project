import './singleComic.scss';
import useMarvelServices from '../services/getApi';
import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

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

    const errorView = error ? <ErrorMessage/> : null;
    const loadingView = loading ? <Spinner/> : null;
    const content = !error && !loadingView ? <ViewComic comic = {comic}/> : null;

    return (<>
        {errorView}
        {loadingView}
        {content}
    </>)
}

const ViewComic = ({comic}) => {
    const {thumbnail, title, description, pages, language, price} = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}
export default SingleComic;