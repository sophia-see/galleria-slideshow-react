import SlideshowControls from '../SlideshowControls/SlideshowControls';
import styles from './Art.module.scss';
import data from '../../data.json';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

const ART_DATA = data;
export default function Art () {
    const navigate = useNavigate();
    const { id } = useParams();
    const artIndex = ART_DATA.findIndex((art) => art.name.toLowerCase() === decodeURI(id ?? "")) ?? 0;
    const art = ART_DATA[artIndex];

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(`/art/${ART_DATA[(artIndex + 1) % ART_DATA.length].name.toLowerCase()}`);
        }, 5000);

        return () => {
            clearTimeout(timeout); // Clean up
        };
    }, [art]);

    return (
        <>
            <SlideshowControls title={art?.name as string} artist={art?.artist.name as string} artIndex={artIndex}/>
        </>
    )
}