import './style.css';

function ModalWindow({active, setActive}) {
    return(
        <div className={active ? "modal__wrap active" : "modal__wrap"} onClick={()=> setActive(false)}>
            <div className='modal__content' onClick={(event) => event.stopPropagation()}>
                <h2>Вход</h2>
                <input type="text" placeholder='логин'/>
                <input type="password" placeholder='пароль'/>
                <button className=''>войти</button>
            </div>
        </div>
    );
}

export default ModalWindow;

