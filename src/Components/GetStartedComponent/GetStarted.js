import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import {joiResolver} from "@hookform/resolvers/joi";

import {signUpInActions} from "../../Redux/slices/signUpIn.slice";
import css from "../../css/getStarted.module.css"
import {loginValidator} from "../../validators/login.validator";

const GetStartedComponent = () => {

    let tokens = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {redirect} = useSelector(state => state.signUpInReducer);
    const {error} = useSelector(state => state.signUpInReducer);

    let [loginState, setLoginState] = useState(css.login);

    const {register, handleSubmit, reset, formState: {isValid, errors}} = useForm({
        resolver: joiResolver(loginValidator),
        mode: 'onChange'
    })

    useEffect(() => {

        if (tokens) {
            const refreshDecoded = jwt_decode(tokens?.refresh_token);
            const refreshExpired = dayjs.unix(refreshDecoded.exp).diff(dayjs()) < 1;

            if (refreshExpired) {
                localStorage.removeItem('currentUser')
            }else {
                navigate("/tables?page=1&order=-id")
            }
        }

        if (redirect) {
            navigate('/tables?page=1&order=-id')
        }
    }, [redirect, navigate,tokens])

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
                        {errors.password || errors.email ?
                            <div style={{textAlign: "center",width:'100%' ,color:'red'}}>
                                <span style={{width:'100%',margin:'0'}}>form is invalid</span>
                            </div>:null
                        }
                        <button disabled={!isValid} type={"submit"}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {GetStartedComponent}

