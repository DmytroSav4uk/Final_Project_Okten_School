import axios from "axios";

import {baseURL} from "../Configs/urls";

const axiosService = axios.create({baseURL});

export { axiosService}