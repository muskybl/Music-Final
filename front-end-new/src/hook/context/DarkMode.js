import { useContext, createContext } from 'react'

const defaultDarkMode = {
    dark : false,
    toggle : () => {}
}
const DarkModeContext = createContext(defaultDarkMode)
export const useDarkMode = () => useContext(DarkModeContext)