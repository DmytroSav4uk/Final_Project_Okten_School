import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const adminService = {
    getAllUsers: (token) => axiosService.get(urls.forAdmin.getAllUsers,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
};

export {adminService};