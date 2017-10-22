import { post } from "./../utils/requset";

export function postLogin(data){
  return post('/api/v1/admin/login',data)
}
