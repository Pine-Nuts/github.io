import { post, get } from "./../utils/requset";

/**
 * get获取文章列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getArtData(page){
  return get('/api/v1/admin/article',{
    params: { page }
  })
}

/**
 * 根据id获取单条记录
 * @param {string} id 查询的id
 * @returns Promise
 */
export function getById(id) {
  return get('/api/v1/admin/article/one',{
    params: { id }
  })
}



/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */
export function postCreate(data) {
  return post('/api/v1/admin/article/create',data)
}

/**
 * post删除用户
 *
 * @export
 * @param {any} id
 * @returns
 */
export function postDel(id) {
  return post(`/api/v1/admin/article/del/${id}`)
}
