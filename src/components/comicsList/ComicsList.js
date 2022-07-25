import './comicsList.scss';
import useMarvelServices from '../services/getApi';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const ComicsList = () => {
    const {error, loading, getAllComics} = useMarvelServices();
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        buildList(true);
    }, []);

    const buildList = async (firstLoading) => {
        firstLoading ? setNewItemLoading(false) : setNewItemLoading(true);
        let comics = [];
        await getAllComics(offset)
            .then(data => comics = data.map((item) => {
                return(
                    <li key = {item.id} className="comics__item">
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}$</div>
                        </Link>
                    </li> 
                )
            }))
        setList(list => [...list, ...comics]);
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
    }

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const wasError = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {list}
                {spinner}
                {wasError}
            </ul>
            <button onClick={() => buildList(false)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;