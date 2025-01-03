import { useNavigate } from 'react-router-dom';
import './Header.module.scss';
export default function Header () {
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/');
    }

    return (
        <header>
            <nav>
                <img src="/assets/shared/logo.svg" alt="logo of galleria" onClick={handleClickHome}/>
                <div className="slideshow-btn">start slideshow</div>
            </nav>
        </header>
    )
}