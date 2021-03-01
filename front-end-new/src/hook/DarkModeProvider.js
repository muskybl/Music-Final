import React from 'react';
import useDarkMode from './customs/useDarkMode'
import {tongleBodyClasses} from '../functions/supports'
const DarkModeProvider = ({ children }) => {
    const [darkState, setState] = useDarkMode()
    if (!darkState.isMounted) return <div />

    const tongleLight = () => {
        if (darkState.dark) tongle()
    }
    const tongleDark = () => {
        if (!darkState.dark) tongle()
    }

    const tongle = () => {
        const dark = !darkState.dark
        localStorage.setItem('dark', JSON.stringify(dark))
        tongleBodyClasses(dark)
    }
    return (
        <div>

        </div>
    );
}

export default DarkModeProvider;
