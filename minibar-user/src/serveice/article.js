import { post, get } from "./../utils/requset";
/**
 * get获取文章列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getArtData(page){
  return get('/api/v2/user/article',{
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
  return post('/api/v2/user/article/create',data)
}

/**
 * 根据id获取单条记录
 * @param {string} id 查询的id
 * @returns Promise
 */
export function getById(id) {
  return get('/api/v2/user/article/one',{
    params: { id }
  })
}

/**
 * get根据标签获取文章列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getByTag(tag_id,page){
  return get('/api/v2/user/article',{
    params: {
      page: page,
      id: tag_id
    }
  })
}
