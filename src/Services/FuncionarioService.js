import { api } from "./Api"

class FuncionarioService {
    update(id, dados) {
        return api.put(`/funcionario/${id}`, dados)
    }

    insert(payload){
        return api.post(`/funcionario/cadastro`, payload)
    }

    get(){
        return api.get(`/funcionario`)
    }

    getByIdContador(id){
        return api.get(`/contador/${id}/funcionarios`)
    }
}

export default new FuncionarioService()