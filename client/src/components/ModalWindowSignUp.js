import './style.css';

function ModalWindowSignUp({activeSignUp, setActiveSignUp}) {
    return(
        <div className={activeSignUp ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActiveSignUp(false)}>
            <div className='modal__content' onClick={(event) => event.stopPropagation()}>
                <h2>Регистрация</h2>
                <input type="text" placeholder='логин'/>
                <input type="password" placeholder='пароль'/>
                <button className='' type='submit'>войти</button>
            </div>
        </div>
    );
}

export default ModalWindowSignUp;