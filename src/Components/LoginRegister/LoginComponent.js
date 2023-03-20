import {useForm} from "react-hook-form";


const LoginComponent = () => {

    const {register, handleSubmit, reset, formState: idDirty, isValid} = useForm({
        mode: 'onChange'
    })


    function submit() {

    }

    return(

        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder={'enter email'} {...register('email')}/>
                <input placeholder={'enter password'} {...register('password')}/>
            </form>


        </div>
    )

}

export {LoginComponent};