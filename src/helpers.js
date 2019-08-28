// 邮箱格式简单验证, 主要验证还是在后端
export function isValidEmail (email) {
  const reg = /\S+@\S+\.\S+/i
  return reg.test(String(email).toLowerCase())
}
