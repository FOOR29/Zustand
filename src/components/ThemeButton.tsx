import type React from "react";
import useThemeStore from "../stores/themeStore";
import { useEffect } from "react";


const ThemeButton: React.FC = () => {
    const { darkMode, toggleDarkMode } = useThemeStore()

    //opcional aplicar los temas, pero para mi es importante
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }), [darkMode]

    return (
        <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo claro' : 'Modo oscuro'}
        </button>
    )
}

export default ThemeButton
