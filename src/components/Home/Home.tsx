import { useNavigate } from 'react-router-dom';
import data from '../../data.json';
import styles from './Home.module.scss';
import React from 'react';
import useDeviceSize from '../../hooks/useDeviceSize';

const ART_DATA = data;
export default function Home () {
    const navigate = useNavigate();
    const galleryRef = React.useRef(null);
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    React.useEffect(() => {
        setHoveredCard(null)
    }, []);
    const handleClickArt = (name: string) => {
        navigate(`/art/${name.toLowerCase()}`);
    }

    const renderArt = ART_DATA.map((art, index) => {
        const isActive = hoveredCard === index;
        return (
            <>
                <div className={`card ${styles.art_card}`} onClick={() => handleClickArt(art.name)} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} key={art.name}>
                    <img src={art.images.thumbnail} className={isActive ? styles.active_img : ""} alt={`image of ${art.name}`} />
                    <div className={styles.art_details}>
                        <div className="card-title">{art.name}</div>
                        <div className="card-artist">{art.artist.name}</div>
                    </div>
                </div>    
            </>

        )
    })

    return (
        <div className={styles.container} ref={galleryRef}>{renderArt}</div>
    )
}