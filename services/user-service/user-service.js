import {
    environment
} from "../../environment/environment";
import axios from '../axios/axios';

export default class UserService {
    constructor() {
        
    }
    login(data) {
        return axios(`${environment.baseUrl}/api/user/login`, {
            method: "POST",
            data
        });
    }


}