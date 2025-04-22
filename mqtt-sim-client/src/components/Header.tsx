import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import logo from '../assets/mqttsim.svg';
import styles from './Header.module.css';
import { RootState } from "../store/store";

const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.value);
    let checked = theme === 'dark' ? true : false;
    const handleToggle = () => {
        checked = !checked;
        dispatch(setTheme(checked ? "dark" : "light"));
    };
    
    return (
        <header className={`row ${styles.headerContainer}`}>
            <div className="col-sm text-end">
                <img src={logo} className={styles.logo} alt="mqtt-sim logo"/>
            </div>
            <div className={`col-sm text-start ${styles.headerText}`}>MQTT-Sim</div>
            <div className="col-md-2 align-items-center">
                <div
                    className="form-check form-switch"
                    style={{ 
                        '--bs-form-switch-width': '60px',
                        '--bs-form-switch-height': '24px'
                    } as React.CSSProperties}
                >
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

export default Header;