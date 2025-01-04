import { useLocation, useNavigate } from 'react-router-dom';
import './Header.module.scss';
import data from '../../data.json';

const ART_DATA = data;

export default function Header () {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isInSlideShow = pathname.includes('/art/');

    const handleClickHome = () => {
        navigate('/');
    }

    const handleStartSlideshow = () => {
        navigate(`/art/${ART_DATA[0].name.toLowerCase()}`);
    }

    return (
        <header>
            <nav>
                <img src="/assets/shared/logo.svg" alt="logo of galleria" onClick={handleClickHome}/>
                <div className="slideshow-btn" onClick={isInSlideShow ? handleClickHome : handleStartSlideshow}>{isInSlideShow ? "stop slideshow" : "start slideshow"}</div>
            </nav>
        </header>
    )
}