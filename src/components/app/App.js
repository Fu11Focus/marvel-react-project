import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, MainPage, SingleComicPage} from "../pages/Index";

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
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Router>
    )
}

export default App;