import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {signUpInActions} from "../../redux/slices/signUpIn.slice";
import css from "../../css/loginRegister.module.css"
import {useEffect} from "react";


const LoginComponent = () => {

    const {register, handleSubmit, reset} = useForm({
        mode: 'onChange'
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {redirect} = useSelector(state => state.signUpInReducer);
    const {error} = useSelector(state => state.signUpInReducer);

    const submit = data => {
        dispatch(signUpInActions.signIn(data));
        reset()
    };

    useEffect(()=>{
        if (redirect) {
            navigate('/tables?page=1')
        }
    },[redirect,navigate])

    return (
        <div className={css.wrap}>
            <div className={css.menu}>
                <form className={css.form} onSubmit={handleSubmit(submit)}>
                    <input placeholder={'enter email'} {...register('email')}/>
                    <input type={"password"} placeholder={'enter password'} {...register('password')}/>
                    <button type={"submit"}>Submit</button>
                    {error ? <p>login or password are incorrect!</p> : null}
                </form>
            </div>
        </div>
    )
}

export {LoginComponent};