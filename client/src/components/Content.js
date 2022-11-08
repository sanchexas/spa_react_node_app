import './style.css';
import Head from './Head';
import MainContent from './MainContent';
import ModalWindow from './ModalWindow';
import { useState } from 'react';

function Content(){
    return(
        
        <div className="content">
            <Head />
            <MainContent />
        </div>
    );
}

export default Content;