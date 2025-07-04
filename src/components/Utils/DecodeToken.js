export const decodeJWT = (token) => {
    try {
        const base64Payload = token.split('.')[1]
        const decodedPayload = atob(base64Payload)
        return JSON.parse(decodedPayload)
    } catch (error) {
        console.error('Erro ao decodificar o token:', error)
        return null
    }
}