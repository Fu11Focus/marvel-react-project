import './charList.scss';
import MarvelServices from '../services/getApi';
import {PropTypes} from 'prop-types';
import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            list: [],
            error: false,
            loading: true,
            newItemLoading: false,
            offset: null,
            charEnded: false
        }
    }

    componentDidMount() {
        this.loadChars();
    }

    onCharLoading = () => {
        this.setState({newItemLoading:true})
    }

    loadChars = async () => {
        this.onCharLoading();
        const marvelServ = new MarvelServices();
        await marvelServ.getAllCharacters(this.state.offset)
            .then(data => {
                let ended = false;
                if (data.length < 9) {
                    ended = true;
                }

                this.setState(({chars, offset}) => ({ chars: [...chars, ...data], loading: false, offset: offset + 9, newItemLoading: false, charEnded: ended }));
                this.buildList();
            })
            .catch(() => {
                this.setState(() => { return { error: true, loading: false } })
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.loadChars();
        }
    }

    buildList = () => {
        this.setState(() => {
            const list = this.state.chars.map(item => {
                let style = { 'objectFit': 'cover' };
                let classNameItem = 'char__item';

                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    style = { 'objectFit': 'contain' };
                }

                if (item.id === this.props.charId){
                    classNameItem = "char__item char__item_selected";
                }

                return (<li className={classNameItem}
                            key={item.id}
                            tabIndex="0"
                            onKeyPress={() => this.props.onCharSelected(item.id)}
                            onClick={() => this.props.onCharSelected(item.id)}>
                                <img src={item.thumbnail} alt={item.name} style={style} />
                                <div className="char__name">{item.name}</div>
                        </li>)
            });
            return { list };
        })
    }

    render() {
        const { error, list, loading, newItemLoading, charEnded } = this.state;
        const content = !loading && !error ? list : null;
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
                    onClick={this.loadChars}
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;