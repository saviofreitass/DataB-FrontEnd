import { api } from './Api'

class ContadorService{
    post(credenciais){
        return api.post(`contador/cadastro`, credenciais)
    }

    get(){
        return api.get(`/contador`)
    }

    getId(id){
        return api.get(`/contador/${id}`)
    }

    put(id, dados){
        return api.put(`/contador/${id}`, dados)
    }

    del(id){
        returnapi.del(`/contador/${id}`)
    }
    
}

export default new ContadorService()