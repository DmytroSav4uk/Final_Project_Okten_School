import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

const paidService = {
    getAllPaid: (query) => axiosService.get(urls.paid.getAllPaid + query,),
    getPaidById: (id) => axiosService.get(urls.paid.getAllPaid + "/" + id),
    changePaidByUrl:(url) => axiosService.patch(urls.paid.getAllPaid + "?" + url, {

        status: 'new'

    })
}


export {paidService};