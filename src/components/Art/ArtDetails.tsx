import styles from './ArtDetails.module.scss';
import useDeviceSize from '../../hooks/useDeviceSize';
import React from 'react';

interface ArtDetailsProps {
    art: any;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ArtDetails ({ art, setIsPaused }: ArtDetailsProps) {
    const { name, artist, year, images, description } = art;
    const { isMobile } = useDeviceSize();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const artImage = isMobile ? images.hero.small : images.hero.large;
    const artGallery = images.gallery;

    React.useEffect(() => {
        setIsModalOpen(false)
    }, [name]);

    const onViewImage = () => {
        setIsModalOpen(true);
        setIsPaused(true);
    }

    const onCloseImage = () => {
        setIsModalOpen(false);
        setIsPaused(false);
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.slideshow_container}>
                <div className={styles.head_container}>
                    <div className={styles.image_container}>
                        <img className={styles.art_image} src={`.${artImage}`} alt={`image of ${art.name}`} />
                        <div className="view-btn-container" onClick={onViewImage}>
                            <img src="/assets/shared/icon-view-image.svg" alt="icon of view image" className='view-btn-icon'/>
                            <div className={`view-btn-text`}>view image</div>
                        </div>
                    
                    </div>                        
                    <div className={styles.art_details}>
                        <div className={styles.art_texts}>
                            <div className="art-title">{name}</div>
                            <div className="art-artist">{artist.name}</div>                        
                        </div>
                        <img className={styles.artist_image} src={`.${artist.image}`} alt={`image of ${art.artist.name}`} />
                    </div>     
                </div>                    
                <div className={styles.description_container}>
                    <div className={styles.content}>
                        <div className={`art-year`}>{year}</div>
                        <div className={styles.bottom_content}>
                            <div className={`art-description`}>{description}</div>          
                            <div className={`source-btn ${styles.btn}`}>go to source</div>                                  
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_container} ${isModalOpen ? '' : styles.hidden}`}>
                <div className={styles.modal}>
                    <div className={`close-btn`} onClick={onCloseImage}>close</div>
                    <img className={styles.art_gallery} src={`.${artGallery}`} alt={`full image of ${name}`} />
                </div>
            </div>
        </div>
        
    )
}