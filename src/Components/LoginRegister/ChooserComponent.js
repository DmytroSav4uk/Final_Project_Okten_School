const ChooserComponent = () => {

    const goToLogin =()=> {
        window.location = '/login'
    }

    const goToRegister=()=> {
        window.location = '/register'
    }

    return (
        <div>
            <h1>Welcome</h1>
            <div>
                <div onClick={goToLogin}>
                    <p>Login</p>
                </div>

                <div onClick={goToRegister}>
                    <p>Register</p>
                </div>
            </div>
        </div>
    )
}

export {ChooserComponent};