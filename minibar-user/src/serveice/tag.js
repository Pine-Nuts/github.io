import { post, get } from "./../utils/requset";
/**
 * get获取文章列表请求
 *
 * @export
 * @param {any} page
 * @returns
 */
export function getTagData(){
  return get('/api/v2/user/Tag')
}
