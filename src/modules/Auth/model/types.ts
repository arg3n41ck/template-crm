export interface LoginUserProps {
  body: Login
}

export interface Login {
  username: string
  password: string
}

export interface LoginUserResponse {
  token: string
  user: unknown

  serial_number: string | null
  tms_address: string
  tid: string | null
}

export interface LoginResponse {
  access: string
  user: {
    id: number
    first_name: string
    last_name: string
    position: string
    department: string
    phone_number: string
    avatar: string
  }
}
