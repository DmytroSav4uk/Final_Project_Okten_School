import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";

const paidService = {
    getAllPaid: (query) => axiosService.get(urls.paid.getAllPaid + query,)
}


export {paidService};