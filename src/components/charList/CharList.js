import './charList.scss';
import MarvelServices from '../services/getApi';
import {PropTypes} from 'prop-types';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(null);
    const [charEnded, setCharEnded] = useState(false);

    useEffect (() => {
        loadChars();
    }, []);

    const onCharLoading = () => {
        setNewItemLoading(true);
    }

    const loadChars = async () => {
        onCharLoading();
        const marvelServ = new MarvelServices();
        await marvelServ.getAllCharacters(offset)
            .then(data => {
                let ended = false;
                if (data.length < 9) {
                    ended = true;
                }
                setChars(chars => [...chars, ...data] );
                setLoading(false);
                setOffset(offset => offset + 9);
                setNewItemLoading(false);
                setCharEnded(ended);
                buildList();
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }

    function buildList() {
            const list = chars.map(item => {
                let style = { 'objectFit': 'cover' };
                let classNameItem = 'char__item';

                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    style = { 'objectFit': 'contain' };
                }

                if (item.id === props.charId){
                    classNameItem = "char__item char__item_selected";
                }

                return (<li className={classNameItem}
                            key={item.id}
                            tabIndex="0"
                            onKeyPress={() => props.onCharSelected(item.id)}
                            onClick={() => props.onCharSelected(item.id)}>
                                <img src={item.thumbnail} alt={item.name} style={style} />
                                <div className="char__name">{item.name}</div>
                        </li>)
            });
            return list;
    }

    const items = buildList();
    const content = !loading && !error ? items : null;
    const errors = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {content}
                {errors}
                {spinner}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={loadChars}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;