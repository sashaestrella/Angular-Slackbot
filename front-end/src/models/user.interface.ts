export interface User{
    username: string
}

export interface UserAnswer{
    username: string,
    id_pregunta: number,
	respuesta: string,
    respuesta_es_correcta: boolean
}