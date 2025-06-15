import { api } from './Api'

class ContrachequeService{
    Inserir(payload){
        return api.post(`/contracheques`, payload)
    }
}


export default new ContrachequeService()