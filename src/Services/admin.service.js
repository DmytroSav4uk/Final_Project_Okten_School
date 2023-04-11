import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";


let url = window.location.pathname;

 let activateToken = url.replace('/admin/activate/','')

const adminService = {
    getAllUsers: () => axiosService.get(urls.forAdmin.getAllUsers),
    registerUser:async (inputData) => axiosService.post(urls.forAdmin.userRegister, inputData),
    activateUser: async (inputData) => axiosService.post(urls.forAdmin.userActivate + "/"+activateToken, inputData),
    recreateToken: async (id) => axiosService.post(urls.forAdmin.recreateToken +"/"+id)
};

export {adminService};