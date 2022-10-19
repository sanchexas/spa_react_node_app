import './style.css';

// function ModalWindowSignUp({activeSignUp, setActiveSignUp})
function ModalWindowSignUp() {
    return(
        // <div className={activeSignUp ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActiveSignUp(false)}></div>
        // <div className='modal__content sign__up__form' onClick={(event) => event.stopPropagation()}>
        <div className='modal__center'>
            <div className='modal__content sign__up__form'>
                <h2>Регистрация</h2>
                <input type="text" placeholder='фио'/>
                <input type="email" placeholder='e-mail'/>
                <input type="tel" placeholder='номер телефона'/>
                <input type="password" placeholder='пароль'/>
                <button className='' type='submit'>зарегистрироваться</button>
            </div>
        </div>
            
    );
}

export default ModalWindowSignUp;