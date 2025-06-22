import { api } from './Api'

class EmpregadorService{
    Insert(dadosEmpregador){
        return api.post(`/empregador`, dadosEmpregador)
    }

    GetByIdContador(){
        return api.get(`/empregador`)
    }

    update(id, dadosEmpregador){
        return api.put(`/empregador/${id}`, dadosEmpregador)
    }
}

export default new EmpregadorService()