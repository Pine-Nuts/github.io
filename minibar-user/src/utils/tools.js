import Cookies from "js-cookie";
export function isLogined(){
  if(Cookies.get('username')){
    return true
  }
  else{
    return false
  }
}

export function setLogined(username){
  Cookies.set('username',username)
}
