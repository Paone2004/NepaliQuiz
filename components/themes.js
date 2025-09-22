// themes.js
import { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isLightMode, setIsLightMode] = useState(false);

    const toggleMode = () => {
        setIsLightMode(!isLightMode);
    };

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };