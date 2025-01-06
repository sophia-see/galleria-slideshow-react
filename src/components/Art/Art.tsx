import SlideshowControls from '../SlideshowControls/SlideshowControls';
import styles from './Art.module.scss';
import data from '../../data.json';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import ArtDetails from './ArtDetails';

const ART_DATA = data;
export default function Art () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isPaused, setIsPaused] = React.useState(false);
    const [remainingTime, setRemainingTime] = React.useState(5000);
    const timeoutRef = React.useRef<number | null>(null);
    const startTimeRef = React.useRef<number | null>(null);

    const artIndex = ART_DATA.findIndex((art) => art.name.toLowerCase() === decodeURI(id ?? "")) ?? 0;
    const art = ART_DATA[artIndex];
    const isLastArt = artIndex === ART_DATA.length - 1;

    React.useEffect(() => {
        setIsPaused(false);
        setRemainingTime(5000);
        timeoutRef.current = null;
        startTimeRef.current = null;
    }, [id]);

    React.useEffect(() => {
        if (isPaused) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                const elapsedTime = Date.now() - (startTimeRef.current ?? 0);
                setRemainingTime((prev) => prev - elapsedTime);
            }
        } else {
            startTimeRef.current = Date.now();
            timeoutRef.current = setTimeout(() => {
                if (!isLastArt) {
                    navigate(`/art/${ART_DATA[(artIndex + 1)].name.toLowerCase()}`);
                }
            }, remainingTime);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [artIndex, isPaused, art]);

    return (
        <>
            <ArtDetails art={art} setIsPaused={setIsPaused}/>
            <SlideshowControls 
                title={art?.name as string} 
                artist={art?.artist.name as string} 
                artIndex={artIndex} 
                isPaused={isPaused}
                setIsPaused={setIsPaused}
            />
        </>
    )
}