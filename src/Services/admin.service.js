import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const adminService = {
    getAllUsers:()=>axiosService.get(urls.forAdmin.getAllUsers)
};

export {adminService};