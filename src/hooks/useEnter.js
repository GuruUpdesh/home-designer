import React, { useEffect } from 'react';

// react hook for when enter key is pressed
const useEnter = (onEscape) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 13) 
                onEscape();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
}

export default useEnter