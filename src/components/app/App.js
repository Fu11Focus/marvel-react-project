import { useState } from "react";
import { Route, BrowserRouter as Router} from "react-router-dom";
import useMarvelServices from "../services/getApi";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner"; 

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charId, setCharId] = useState(null);

    const onCharSelected = (charId) => {
        setCharId(charId);
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Router>
                    <Route path="/">
                        <ErrorBoundary>
                            <RandomChar/>
                        </ErrorBoundary>
                        <div className="char__content">
                            <ErrorBoundary>
                                <CharList onCharSelected={onCharSelected} charId={charId}/>
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <CharInfo charId={charId}/>
                            </ErrorBoundary>
                        </div>
                    </Route>
                    <Route path="/comics">
                        <AppBanner/>
                        <ComicsList/>
                    </Route>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                </Router>
            </main>
        </div>
    )
}

export default App;