import SlideshowControls from '../SlideshowControls/SlideshowControls';
import styles from './Art.module.scss';
import data from '../../data.json';
import { useParams } from 'react-router-dom';

const ART_DATA = data;
export default function Art () {
    const { id } = useParams();
    const artIndex = ART_DATA.findIndex((art) => art.name.toLowerCase() === decodeURI(id ?? "")) ?? 0;
    const art = ART_DATA[artIndex];

    return (
        <>
            <SlideshowControls title={art?.name as string} artist={art?.artist.name as string} artIndex={artIndex}/>
        </>
    )
}