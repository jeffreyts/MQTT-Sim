import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import logo from '../assets/mqttsim.svg';
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
        <header className="row justify-content-end bg-dark border-bottom border-1 text-body align-items-center m-0 px-0">
            <div className="col-8 col-md-4 d-flex gap-3 align-items-center justify-content-center text-start">
                <img src={logo} style={{width: 60, height: 'auto'}} alt="mqtt-sim logo"/>
                <div className="fs-2 fw-bold fst-italic">MQTT-Sim</div>
            </div>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-end px-5">
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