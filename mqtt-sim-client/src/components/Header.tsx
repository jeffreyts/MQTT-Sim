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
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark':
                return <i className="bi bi-sun-fill fs-4 m-1 text-warning" onClick={handleToggle}></i>;
            case 'light':
                return <i className="bi bi-moon-stars-fill fs-4 m-1 text-secondary" onClick={handleToggle}></i>;
            default:
        }
    }
    
    return (
        <header className="row justify-content-end bg-body border-bottom border-1 text-body align-items-center m-0 px-0">
            <div className="col-8 col-md-4 d-flex gap-3 align-items-center justify-content-center text-start">
                <img src="/mqttsim.svg" style={{width: 60, height: 'auto'}} alt="mqtt-sim logo"/>
                <div className="fs-2 fw-bold fst-italic">MQTT-Sim</div>
            </div>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-end px-5">
                {getThemeIcon()}
            </div>
        </header>
    )
}