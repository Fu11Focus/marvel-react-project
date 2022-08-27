import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, MainPage, SinglePage, Page404} from "../pages/Index";
import  SingleComicLayout  from '../pages/SingleComicLayout/SingleComicLayout';
import  SingleCharacterLayout  from '../pages/SingleCharacterLayout/SingleCharacterLayout';

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
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Router>
    )
}

export default App;