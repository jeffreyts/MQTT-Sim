import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { RootState } from "../store/store";

export default function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.value);
    let checked = theme === 'dark' ? true : false;

    const handleToggle = () => {
        checked = !checked;
        dispatch(setTheme(checked ? "dark" : "light"));
    }

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark':
                return <i className="bi bi-moon-stars-fill fs-5 m-1 text-secondary" onClick={handleToggle} title="Switch to light mode"></i>;
            case 'light':
                return <i className="bi bi-sun-fill fs-5 m-1 text-secondary" onClick={handleToggle} title="Switch to dark mode"></i>;
            default:
        }
    }
    
    return (
        <header className="row justify-content-between bg-body border-bottom border-2 text-body align-items-center m-0 px-0">
            <div className="col col-md-4 d-flex gap-1 align-items-center justify-content-start text-start">
                <img src="/mqttsim.svg" style={{width: 40, height: 'auto', paddingTop: 1.5}} alt="mqtt-sim logo"/>
                <h5 className="m-0 p-0 fw-bold">MQTT-Sim</h5>
            </div>
            <div className="col col-md-4 d-flex align-items-center justify-content-end px-4">
                {getThemeIcon()}
            </div>
        </header>
    );
}