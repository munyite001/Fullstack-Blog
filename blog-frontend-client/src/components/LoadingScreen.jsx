import { useEffect, useState } from 'react';

export default function LoadingScreen() {

    const [loadingText, setLoadingText] = useState('Loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === 'Loading...') {
                    return 'Loading'
                } else {
                    return prev + '.'
                }
            })
        }, 500);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="loading-screen">
            <h1>{loadingText}</h1>
            <div className="loading-animation">
                <div className="loading-bar"></div>
            </div>
        </div>
    )
}