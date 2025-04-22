import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const themesList = ['light', 'dark', 'auto'];

const ThemeContainer = ({ children }: { children: React.ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme.value);

    useEffect(() => {
        console.log('Updated theme:', theme);
        if (themesList.includes(theme)){
            document.body.setAttribute('data-bs-theme', theme);
        }
        else {
            document.body.setAttribute('data-bs-theme', 'dark');
        }
    }, [theme]);

    return <>{children}</>;
}

export default ThemeContainer;
