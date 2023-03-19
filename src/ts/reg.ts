const key = 'user_list_storage_key'
const user_key = 'user_info'
const reg_functon = {
  //保存信息
  save_info(data: object) {
    if (data.username == '') {
      return false
    }
    let user_list = new Array()
    user_list = this.get_info()
    for (let i = 0; i < user_list.length; i++) {
      data.uid = user_list.length + 1
      data.time = Date.parse(new Date());
      console.log(data.uid, data.time, data);
      if (data.username != user_list[i].username) {
        user_list.push(data)
        console.log(user_list);
        localStorage.setItem(key, JSON.stringify(user_list))
        return true
      } else {
        return false
      }
    }
  },
  //获取信息
  get_info() {
    const user_list = JSON.parse(localStorage.getItem(key))
    return user_list
  },
  //删除信息（谨用）
  del_info() {
    return localStorage.removeItem(key)
  },
  //替换信息
  replace_info(newArr: any) {
    const user_list = newArr
    console.log(user_list);
    localStorage.setItem(key, JSON.stringify(user_list))
  },
  // 登录
  user_login(username: string, password: string) {
    const user_list = this.get_info()
    let return_boolean = false
    user_list.forEach(element => {
      if (element.username == username && element.password == password) {
        localStorage.setItem(user_key, JSON.stringify(element))
        return_boolean = true
      }
    });
    return return_boolean
  },
  //获取用户信息
  get_user() {
    return JSON.parse(localStorage.getItem(user_key))
  }
}

export default reg_functon