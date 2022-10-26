import './style.css';
import { Routes, Route} from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import Catalog from './pages/Catalog';
import Workshop from './pages/Workshop';
import About from './pages/About';
import ModalWindow from './ModalWindow';
import ModalWindowSignUp from './ModalWindowSignUp';
import Account from './pages/Account';

function MainContent(){
    return(
        <div className="main__content">
            {/* <LeftBlock /> */}
            <Routes>
                <Route path='/' index element={<NewsPage />}></Route>
                <Route path='/catalog' element={<Catalog />}></Route>
                <Route path='/workshop' element={<Workshop />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/signin' element={<ModalWindow />}></Route>
                <Route path='/signup' element={<ModalWindowSignUp />}></Route>
                <Route path='/account' element={<Account />}></Route>
            </Routes>
            
        </div>
    );
}

export default MainContent;