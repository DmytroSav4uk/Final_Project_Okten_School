import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const paidService = {
    getAllPaid:()=>axiosService.get(urls.paid.getAllPaid),
};

export {paidService};