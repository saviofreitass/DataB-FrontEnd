import { api } from './Api'

class EmpregadorService{
    Insert(dadosEmpregador){
        return api.post(`/empregador`, dadosEmpregador)
    }

    GetByIdContador(){
        return api.get(`/empregador`)
    }
}

export default new EmpregadorService()