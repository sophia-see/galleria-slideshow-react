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

    React.useEffect(() => {
        console.log('Title changed, resetting animation');
    
        setAnimate(false); // Reset animation class
        const timeout = setTimeout(() => {
            setAnimate(true); // Apply animation class
            console.log('Animation re-enabled', animate);
        }, 0);
    
        return () => {
            clearTimeout(timeout); // Clean up
        };
    }, [title]);

    const handleChangeArt = (index: number) => {
        navigate(`/art/${ART_DATA[index].name.toLowerCase()}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.art_details}>
                <div className="slideshow-title">{title}</div>
                <div className="slideshow-artist">{artist}</div>
            </div>
            <div className={`${styles.controls} ${animate ? styles.animate : ''}`}>
                <button disabled={isFirst} onClick={() => handleChangeArt(artIndex - 1)}><RxTrackPrevious size={16}/></button>
                <button disabled={isLast} onClick={() => handleChangeArt(artIndex + 1)}><RxTrackNext  size={16}/></button>
            </div>
        </div>
    )
}