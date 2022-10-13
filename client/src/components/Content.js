import './style.css';
import Head from './Head';
import MainContent from './MainContent';

function Content(){
    return(
        <div className="content">
            <Head />
            <MainContent />
        </div>
    );
}

export default Content;