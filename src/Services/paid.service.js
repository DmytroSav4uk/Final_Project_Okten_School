import {axiosService} from "./axios.service";
import {urls} from "../Configs/urls";



function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}



const paidService = {
    getAllPaid:()=>axiosService.get(urls.paid.getAllPaid, {

        headers: {
            'Authorization': `Bearer ${getCookie('token')}`
        }

    }),
};

export {paidService};