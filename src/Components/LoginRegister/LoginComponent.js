import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {signUpInActions} from "../../redux/slices/signUpIn.slice";
import {signUpInService} from "../../Services/signUpIn.service";
import {axiosService} from "../../Services/axios.service";
import {urls} from "../../Configs/urls";
import {useEffect, useState} from "react";


const LoginComponent = () => {

    const {register, handleSubmit, reset, formState: isDirty, isValid} = useForm({
        mode: 'onChange'
    })

    //let [res, setRes] = useState({})

    let inputData =useSelector((state =>state.signUpInReducer))
    const dispatch = useDispatch();
    const submit = async (data) => {
         inputData = data
          dispatch(signUpInActions.signIn(inputData));
        //axiosService.post(urls.signUpIn.signIn,data).then(({data})=> setRes(data))

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

export {LoginComponent};