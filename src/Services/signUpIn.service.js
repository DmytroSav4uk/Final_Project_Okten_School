import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const signUpInService = {
    signIn: async (signInData)=>axiosService.post(urls.signUpIn.signIn,signInData),
    signUp: async (signUpData)=>axiosService.post(urls.signUpIn.signUp,signUpData)
};

export {signUpInService};