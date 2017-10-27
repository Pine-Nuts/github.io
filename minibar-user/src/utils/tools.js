import Cookies from "js-cookie";
export function isLogined(){
  if(Cookies.get('userId')){
    return true
  }
  else{
    return false
  }
}

export function setLogined(id){
  Cookies.set('userId',id)
}
