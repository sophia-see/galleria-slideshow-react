import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';
import styles from './SlideshowControls.module.scss';
import data from '../../data.json';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface SlideshowControlsProps {
    title: string;
    artist: string;
    artIndex: number;
}

const ART_DATA = data;
export default function SlideshowControls ({ title, artist, artIndex }: SlideshowControlsProps) {
    const navigate = useNavigate();
    const isFirst = artIndex === 0;
    const isLast = artIndex === ART_DATA.length - 1;
    const [animate, setAnimate] = React.useState(false);

    const resetAnimation = () => {
        setAnimate(false); // Reset animation class
        setTimeout(() => {
            setAnimate(true); // Apply animation class
        }, 0);
    }

    React.useEffect(() => {    
        resetAnimation();
    }, [title]);

    const handleChangeArt = (index: number) => {
        resetAnimation();
        navigate(`/art/${ART_DATA[index].name.toLowerCase()}`);
    }

    return (
        <div className={styles.slideshow_controls}>
            <div className={`${styles.container}`}>
                <div className={styles.art_details}>
                    <div className="slideshow-title">{title}</div>
                    <div className="slideshow-artist">{artist}</div>
                </div>
                <div className={`${styles.controls}`}>
                    <button disabled={isFirst} onClick={() => handleChangeArt(artIndex - 1)}><RxTrackPrevious size={16}/></button>
                    <button disabled={isLast} onClick={() => handleChangeArt(artIndex + 1)}><RxTrackNext  size={16}/></button>
                </div>
            </div>
            {animate && <div className={`${styles.loader} ${animate ? styles.animate : ''}`}></div>}
        </div>
    )
}