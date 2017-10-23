import { post, get } from "./../utils/requset";

/**
 * post登陆请求
 *
 * @export
 * @param {any} data
 * @returns
 */
export function postLogin(data){
  return post('/api/v1/admin/login',data)
}

/**
 * get获取用户列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getData(page){
  return get('/api/v1/admin/member',{
    params: { page }
  })
}

/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */
export function postCreate(data) {
  return post('/api/v1/admin/member/create',data)
}

/**
 * 根据id获取单条记录
 * @param {string} id 查询的id
 * @returns Promise
 */
export function getById(id) {
  return get('/api/v1/admin/member/one',{
    params: { id }
  })
}
/**
 * 根据id修改记录
 * @param {string} id 需要修改的记录的id
 * @param {object} data 修改的对象内容
 * @returns Promise
 */
export function postUpdate(id,data) {
  return post(`/api/v1/admin/member/update/${id}`,data)
}

/**
 * post删除用户
 *
 * @export
 * @param {any} id
 * @returns
 */
export function postDel(id) {
  return post(`/api/v1/admin/member/del/${id}`)
}

