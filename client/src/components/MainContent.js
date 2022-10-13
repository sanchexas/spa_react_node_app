import './style.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LeftBlock from './LeftBlock';
import NewsPage from './pages/NewsPage';
import Catalog from './pages/Catalog';
import Workshop from './pages/Workshop';
import About from './pages/About';

function MainContent(){
    return(
        <div className="main__content">
            {/* <LeftBlock /> */}
            <Routes>
                <Route path='/' index element={<NewsPage />}></Route>
                <Route path='/catalog' element={<Catalog />}></Route>
                <Route path='/workshop' element={<Workshop />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Routes>
            
        </div>
    );
}

export default MainContent;