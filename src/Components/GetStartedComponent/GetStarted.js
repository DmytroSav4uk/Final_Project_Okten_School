import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {signUpInActions} from "../../Redux/slices/signUpIn.slice";
import css from "../../Css/getStarted.module.css"

const GetStartedComponent = () => {

    const {register, handleSubmit, reset} = useForm({
        mode: 'onChange'
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {redirect} = useSelector(state => state.signUpInReducer);
    const {error} = useSelector(state => state.signUpInReducer);

    let [loginState, setLoginState] = useState(css.login);

    useEffect(() => {
        if (redirect) {
            navigate('/tables?page=1')
        }
    }, [redirect, navigate])

    const changeLoginState = () => {
        if (loginState === css.login) {
            setLoginState(css.loginClicked)
        } else {
            setLoginState(css.login)
        }
    }

    const submit = (data) => {
        dispatch(signUpInActions.signIn(data));
        reset()
    };


    return (
        <div className={css.wrap}>
            <div className={css.main}>
                {error ?
                    <label className={css.wrongData} htmlFor={css.chk} aria-hidden="true">Oops, wrong data</label> :
                    <label htmlFor={css.chk} aria-hidden="true">Welcome!</label>}
                <div className={loginState}>
                    <form onSubmit={handleSubmit(submit)}>
                        <label onClick={changeLoginState} htmlFor={css.chk} aria-hidden={"true"}>Login</label>
                        <input type={"email"} name={"email"} placeholder={"Email"} {...register('email')}/>
                        <input type={"password"} name={"pswd"} placeholder={"Password"} {...register('password')} />
                        <button type={"submit"}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {GetStartedComponent}

