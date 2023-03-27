import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {signUpInActions} from "../../redux/slices/signUpIn.slice";
import css from "../../css/loginRegister.module.css"

const RegisterComponent = () => {

    const {register, handleSubmit, reset, formState: isDirty, isValid} = useForm({
        mode: 'onChange'
    })

    const dispatch = useDispatch();
    function submit (data){
        dispatch(signUpInActions.signUp(data));
        reset();
    }

    return (

        <div className={css.wrap}>
            <div className={css.menu}>
                <form className={css.form} onSubmit={handleSubmit(submit)}>
                    <input placeholder={'enter email'} {...register('email')}/>
                    <input type={"password"} placeholder={'enter password'} {...register('password')}/>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        </div>
    )

}

export {RegisterComponent};