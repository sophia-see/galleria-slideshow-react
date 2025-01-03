import data from '../../data.json';
import styles from './Home.module.scss';

const ART_DATA = data;
export default function Home () {

    const renderArt = ART_DATA.map((art) => {
        return <div className={styles.art_card}>
            <img src={art.images.thumbnail} alt={`image of ${art.name}`} />
            <div className={styles.art_details}>
                <div className="card-title">{art.name}</div>
                <div className="card-artist">{art.artist.name}</div>
            </div>
        </div>
    })

    return (
        <div className={styles.container}>{renderArt}</div>
    )
}