import './style.css';

// function ModalWindow({active, setActive})
function ModalWindow() {
    return(
        // <div className={active ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActive(false)}></div>
        // <div className='modal__content' onClick={(event) => event.stopPropagation()}>
        <div className='modal__center'>
           <div className='modal__content'>
                <h2>Вход</h2>
                <input type="text" placeholder='логин'/>
                <input type="password" placeholder='пароль'/>
                <button className='' type='submit'>войти</button>
            </div>
        </div>
    );
}

export default ModalWindow;

