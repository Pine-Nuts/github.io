import { post, get } from "./../utils/requset";

/**
 * get获取标签列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getTagData(page){
  return get('/api/v1/admin/tag',{
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
  return post('/api/v1/admin/tag/create',data)
}

/**
 * 根据id获取单条记录
 * @param {string} id 查询的id
 * @returns Promise
 */
export function getById(id) {
  return get('/api/v1/admin/tag/one',{
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
  return post(`/api/v1/admin/tag/update/${id}`,data)
}

/**
 * post删除标签
 *
 * @export
 * @param {any} id
 * @returns
 */
export function postDel(id) {
  return post(`/api/v1/admin/tag/del/${id}`)
}

