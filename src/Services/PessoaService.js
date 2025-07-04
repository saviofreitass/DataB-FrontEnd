import { api } from "./Api";

class PessoaService {
    get(){
        return api.get(`/pessoa`)
    }
}

export default new PessoaService()