import { post, get } from "./../utils/requset";
/**
 * 验证用户名是否存在
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getValidateUser(username){
  return get('/api/v3/validate/member_username',{
    params: { username }
  })
}

/**
 * 修改密码
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getValidatePwd(password,id){
  return get('/api/v3/validate/member_password',{
    params: { password,id }
  })
}
