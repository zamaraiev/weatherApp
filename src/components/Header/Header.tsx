import style from './Header.module.scss';
import logo from './../../assets/logo.svg';

function Header(){
    return(
        <div className={style.header}>
            <div className={style.headerContainer}>
                <img src={logo} alt="Logo" className={style.logo}/>
                <p>Bremen</p>
            </div>
        </div>
    )
}

export default Header;