import { useState } from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner"; 

import decoration from '../../resources/img/vision.png';

const App = () => {
    
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Router>
    )
}

export default App;

const MainPage = () => {
    const [charId, setCharId] = useState(null);

    const onCharSelected = (charId) => {
        setCharId(charId);
    }

    return (
        <>
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
        </>
    )
}

const ComicsPage = () => {
    return(<>
        <AppBanner/>
        <ComicsList/> 
    </>)
}