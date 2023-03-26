import css from "../../css/chooser.module.css"


const ChooserComponent = () => {

    function goToLogin() {
        window.location = '/login'
    }

    function goToRegister(){
        window.location = '/register'
    }

    return (
        <div className={css.wrap}>
            <div className={css.menu}>
                <h1>Welcome</h1>
                <div className={css.buttons}>
                    <div className={css.button} onClick={goToLogin}>
                        <p>Login</p>
                    </div>

                    <div className={css.button} onClick={goToRegister}>
                        <p>Register</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export {ChooserComponent};