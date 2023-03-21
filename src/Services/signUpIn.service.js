import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const signUpInService = {
    signIn:(signInData)=>axiosService.post(urls.signUpIn.signIn,signInData),
    signUp:(signUpData)=>axiosService.post(urls.signUpIn.signUp,signUpData)
};

export {signUpInService};