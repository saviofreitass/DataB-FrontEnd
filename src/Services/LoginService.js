import { api } from "./Api";

class LoginService{
    post(credenciais){
        return api.post(`/login`, credenciais)
    }
}

export default new LoginService()