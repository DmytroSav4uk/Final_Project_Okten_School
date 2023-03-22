import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {signUpInActions} from "../../redux/slices/signUpIn.slice";


const RegisterComponent = () => {

    const {register, handleSubmit, reset, formState: isDirty, isValid} = useForm({
        mode: 'onChange'
    })

    const dispatch = useDispatch();
    const submit = async (data) => {
        dispatch(signUpInActions.signUp(data));
        reset();
    }

    return (

        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder={'enter email'} {...register('email')}/>
                <input placeholder={'enter password'} {...register('password')}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )

}

export {RegisterComponent};