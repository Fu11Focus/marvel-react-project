import { useState, useEffect, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import MarvelServices from '../services/getApi';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        onCharUpdate();
    }, [props.charId]);

    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    function onCharUpdate() {
        const {charId} = props;
        if (!charId) {
            return;
        }

        onCharLoading();
        const marvelServ = new MarvelServices();
        marvelServ.getCharacter(charId)
                  .then(onCharLoaded)
                  .catch(onError);        
    }

        const skeleton = char || error || loading ? null : <Skeleton/>;
        const content = !(loading || error || !char) ? <CharBoxInfo char={char}/> : null;
        const errors = error ? <ErrorMessage/> : null;
        const load = loading ? <Spinner/> : null;

    return (
        <div className='char__info'>
            {skeleton}
            {content}
            {errors}
            {load}
        </div>
    )
}

const CharBoxInfo = ({char}) => {
    const {name, thumbnail, description, homepage, wikipage, comics} = char;
    let cms = null; 
    let imgStyle = {'objectFit' : 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    if (comics.length === 0) {
        cms = "Don`t have info about comics";   
    }else if (comics.length > 0) {
        comics.splice(10, comics.length - 10)
        cms = comics.map((item, i) => {
            return (
                <li key={i} className="char__comics-item">
                    {item.name}
                </li> 
            )
        })
    } 
    
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wikipage} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {cms}
                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number,
    
}
export default CharInfo;