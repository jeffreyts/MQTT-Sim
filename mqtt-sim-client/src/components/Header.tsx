import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import logo from '../assets/mqttsim.svg';
import styles from './Header.module.css';
import { RootState } from "../store/store";

export default function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.value);
    let checked = theme === 'dark' ? true : false;
    const handleToggle = () => {
        checked = !checked;
        dispatch(setTheme(checked ? "dark" : "light"));
    };
    
    return (
        <header className={`row justify-content-end ${styles.headerContainer}`}>
            <div className="col-8 col-md-4 text-start d-flex gap-3 align-items-center d-flex justify-content-center">
                <img src={logo} className={styles.logo} alt="mqtt-sim logo"/>
                <div className={styles.headerText}>MQTT-Sim</div>
            </div>
            <div className="col-2 col-md-4 text-start align-items-center d-flex justify-content-end px-5">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="switchSizeLargeChecked"
                        onChange={handleToggle}
                    />
                    <label
                        className="form-check-label ms-2"
                        htmlFor="switchSizeLargeChecked"
                    >
                        {theme === 'light' ? 'Light' : 'Dark'}
                    </label>
                </div>
            </div>
        </header>
    )
}