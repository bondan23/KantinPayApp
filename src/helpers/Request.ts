// tslint:disable:arrow-parens
import axios from 'axios'
import { AsyncStorage } from 'react-native'

// const HOST = 'http://kantinpay.off-bid.id'
const HOST = 'http://192.168.5.252/kantinpay/public'
const TOKEN_BONDAN =
  // tslint:disable-next-line:max-line-length
  'qWFDmwmZ1QNtlEJqWreOUAJJaYs20SLvQhFvN8Yj9bEaWwFGMVel9GlKRn3j'

const instance = axios.create({
  baseURL: `${HOST}/api/`,
  headers: {
    // tslint:disable-next-line:object-literal-key-quotes
    'Content-Type': 'application/json',
  },
})

const requestPost = async (path: string, data: object) => {
  const getToken = await AsyncStorage.getItem('userToken')
  const token = getToken || TOKEN_BONDAN
  const headers = {
    // tslint:disable-next-line:object-literal-key-quotes
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  return instance.post(path, data, { headers }).then(v => v.data)
}

const requestGet = async (path: string, parameter?: object) => {
  const getToken = await AsyncStorage.getItem('userToken')
  const token = getToken || TOKEN_BONDAN

  const headers = {
    // tslint:disable-next-line:object-literal-key-quotes
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  return instance
    .get(path, { headers, params: { ...parameter } })
    .then(v => v.data)
}

export const getDetail = (email?: string) =>
  requestGet('details', !!email ? { email } : {})
export const getHistory = () => requestGet('history')
export const requestLogin = (email: string, password: string) =>
  requestPost('login', {
    email,
    password,
  })
export const requestTopUp = (balance: number) =>
  requestPost('request_topup', { request_balance: balance })
export const sendBalance = (id: number, amount: number) =>
  requestPost('/transfer', { to_id: id, amount })
export const requestLogout = () => requestGet('logout')
export const requestWithdraw = (balance: number) =>
  requestPost('request_withdraw', { request_balance: balance })
export const requestRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string, 
  roleId: number,
) =>
  requestPost('register', {
    name,
    email,
    password,
    c_password: confirmPassword,
    role_id: roleId,
  })
