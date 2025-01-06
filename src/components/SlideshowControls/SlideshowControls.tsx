import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';
import styles from './SlideshowControls.module.scss';
import data from '../../data.json';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

interface SlideshowControlsProps {
    title: string;
    artist: string;
    artIndex: number;
    isPaused: boolean;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const ART_DATA = data;
export default function SlideshowControls ({ title, artist, artIndex, isPaused, setIsPaused }: SlideshowControlsProps) {
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
        setIsPaused(false);
    }, [title]);

    const handleChangeArt = (index: number) => {
        console.log({index, art: ART_DATA[index]})
        resetAnimation();
        navigate(`/art/${ART_DATA[index].name.toLowerCase()}`);
    }

    const renderLoad = React.useMemo(() => {
        if (animate)
            return <div className={`${styles.loader} ${animate ? styles.animate : ''} ${isPaused ? styles.paused : ""}`}></div>
        return null;
    }, [animate, isPaused]);

    return (
        <div className={styles.slideshow_controls}>
            <div className={`${styles.container}`}>
                <div className={styles.art_details}>
                    <div className="slideshow-title">{title}</div>
                    <div className="slideshow-artist">{artist}</div>
                </div>
                <div className={`${styles.controls}`}>
                    <button disabled={isFirst} onClick={() => handleChangeArt(artIndex - 1)}><RxTrackPrevious size={16}/></button>
                    {isPaused 
                        ? <button onClick={() => setIsPaused(false)}><IoIosPlay size={16}/></button>
                        : <button onClick={() => setIsPaused(true)}><IoIosPause size={16}/></button>
                    }
                    <button disabled={isLast} onClick={() => handleChangeArt(artIndex + 1)}><RxTrackNext  size={16}/></button>
                </div>
            </div>
            {renderLoad}
        </div>
    )
}