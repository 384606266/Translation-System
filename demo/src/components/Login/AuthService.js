import axios from "axios";
import Qs from 'qs'

const API_URL = "http://127.0.0.1:8080";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/login/", Qs.stringify({'username': username, 'password': password}))
            .then(response => {
                if (response.data) {
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('token', response.data.token);
                }
            });
    }

    logout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    register(username, email, password) {
        return axios.post(API_URL + "/user/", Qs.stringify({
            'username': username, 'email': email, 'password': password
        }));
    }

    getCurrentUser() {
        return {'username': localStorage.getItem('username'), 'token': localStorage.getItem('token')};
    }
}

export default new AuthService();