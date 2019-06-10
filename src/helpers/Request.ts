// tslint:disable:arrow-parens
import axios from 'axios'
import { AsyncStorage } from 'react-native'

const HOST = 'http://192.168.100.157:8000'
const TOKEN_BONDAN =
  // tslint:disable-next-line:max-line-length
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxZjRjZTQ0YmI1MjBiMDljZTY5NzMxMjc0MDdjMDMzOTQzZDAzYmNkMTRkZDA3M2Q4YWExNjEzYzhiMGQzYWViOTdmMGEyYmExNjVjN2EzIn0.eyJhdWQiOiIxIiwianRpIjoiMjFmNGNlNDRiYjUyMGIwOWNlNjk3MzEyNzQwN2MwMzM5NDNkMDNiY2QxNGRkMDczZDhhYTE2MTNjOGIwZDNhZWI5N2YwYTJiYTE2NWM3YTMiLCJpYXQiOjE1NTM4NjY4NjEsIm5iZiI6MTU1Mzg2Njg2MSwiZXhwIjoxNTg1NDg5MjYxLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.CX5vl990Hl0VPcqEYUvkiH3LFGxTCZkaZXGA5Jn5OSXDr1pRvyUGrtftUqMxZ6IigOG6wjbyqLaZNxXSY6tsZRQ8SPMYbmDviWJAtj5sKc-ZUPkXJ35ceq8i1k71Ok-2AJ9WHjMBwH56qsgMWzCmXHxeKLYMLamlDIyCnymDjaOSQK8MtMvJxPOO0wjiD81XUQmZEDSB-MqOpBFmjp8gyNALsmXlH2hqwJOVg4wvnv352H0EUAbEHf27Uj4S6rKRZ7lCVR8uemfDXcqCr7GjbGaeEcgbFX4QFKhBjmW2_kRTzQKLPXdTokl3zT7qh7fr3NoCK5WTyUNRYYeGvVgy6m9B7PFjt8X2gUsmkUwOQczIp6Wv32KNd1aBKfSjhLRkGQ4Cb5Bf6eE0BWh59-BmIQDzvL6yyNIJjy9KBWnqkRRYZ3gfr8mU8mJV0id1WpZqxn2ttLjr_2ikbL090ljzEMXhdjIWAOlBOm5qi7aUD62JQ6CLKn5K8B33Lcyp4b7mVrivrWxrH4e8EJUsNbU9OoZTYoIadF0cGyLkFBBjRRLot817COo8IGldZN7nj3sa49JBuwbShobRNdUtlG0xJjomn_iA8U4mRR7TwA-dsm4g2ygn2ozb2lrdy9To9_F7vQkags7MvMrx3hF_qjMrPrVHC7FRQiD5weyVe7_9geo'

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
export const sendBalance = (id: number, amount: number) =>
  requestPost('/transfer', { to_id: id, amount })
export const requestLogout = () => requestGet('logout')
