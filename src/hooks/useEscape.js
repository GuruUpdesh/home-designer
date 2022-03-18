import React, { useEffect } from 'react';

// react hook for when escape key is pressed
const useEscape = (onEscape) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) 
                onEscape();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
}

export default useEscape