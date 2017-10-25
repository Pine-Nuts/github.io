import axios from "axios";
import { server } from "./config";

/**
 * get请求
 *
 * @export
 * @param {any} url 路径
 * @param {any} payLoad 配置参数
 * @param {boolean} [isLocal=true] 是否本地
 * @returns Promise
 */
export function get(url,payLoad,isLocal=true){
  if(isLocal){
    url = server + url;
  }
  return axios.get(url,payLoad);
}

/**
 * post请求
 *
 * @export
 * @param {any} url 路径
 * @param {any} data 参数数据
 * @param {boolean} [isLoacl=true] 是否本地
 * @returns Promise
 */
export function post(url,data,isLoacl=true){
  if(isLoacl){
    url = server + url;
  }
  return axios.post(url,data)
}
