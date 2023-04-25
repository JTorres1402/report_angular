export class Usuario {
    user!: string
    password!: string
}

export class Login {
    message!: string
    rol!: string
    token!: string 
}

export class profile {
    id_usuario!: number
    nombre!: string
    correo!: string
    apellido!: string
    telefono!: number
    rol?: string
} 
