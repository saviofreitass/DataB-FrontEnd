import { api } from './Api'

class ContrachequeService{
    Inserir(payload){
        return api.post(`/contracheques`, payload)
    }

    GetByEmpregadorId(empregadorId){
        return api.get(`/empregador/${empregadorId}/contracheques`)
    }

    GetByFuncionarioId(){
        return api.get(`/contracheques`)
    }
}


export default new ContrachequeService()