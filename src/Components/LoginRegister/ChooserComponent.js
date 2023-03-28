import css from "../../css/chooser.module.css"

import {useNavigate} from "react-router-dom";

const ChooserComponent = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div className={css.wrap}>
            <div className={css.menu}>
                <h1>Welcome</h1>
                <div className={css.buttons}>
                    <div className={css.button} onClick={goToLogin}>
                        <p>Login</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ChooserComponent};