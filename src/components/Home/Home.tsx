import { useNavigate } from 'react-router-dom';
import data from '../../data.json';
import styles from './Home.module.scss';

const ART_DATA = data;
export default function Home () {
    const navigate = useNavigate();

    const handleClickArt = (name: string) => {
        navigate(`/art/${name.toLowerCase()}`);
    }

    const renderArt = ART_DATA.map((art) => {
        return (
            <div className={styles.art_card} onClick={() => handleClickArt(art.name)}>
                <img src={art.images.thumbnail} alt={`image of ${art.name}`} />
                <div className={styles.art_details}>
                    <div className="card-title">{art.name}</div>
                    <div className="card-artist">{art.artist.name}</div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.container}>{renderArt}</div>
    )
}