import { post, get } from "./../utils/requset";

/**
 * get获取回复列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getRepData(page,id){
  return get('/api/v2/user/reply',{
    params: { page, id}
  })
}

/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */
export function postCreate(data) {
  return post('/api/v2/user/reply/create',data)
}


