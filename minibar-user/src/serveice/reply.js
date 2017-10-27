import { post, get } from "./../utils/requset";
/**
 * get获取文章列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getRepData(page,id){
  return get('/api/v2/user/replay',{
    params: { page, id}
  })
}
