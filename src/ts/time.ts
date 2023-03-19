export function useTime(data: any) {
  const format = "yyyy-MM-dd hh:mm:ss";
  const new_date = new Date(data)
  const y = new_date.getFullYear()
  const M = new_date.getMonth() + 1
  const d = new_date.getDate()
  const h = new_date.getHours()
  const m = new_date.getMinutes()
  const s = new_date.getSeconds()
  const now_date = new Date()
  const now_d = now_date.getDate()
  const judge = now_d - d
  if (judge == 0) {
    let format2 = format.replace('yyyy-', '')
    format2 = format2.replace('MM-', "")
    format2 = format2.replace("dd", "")
    format2 = format2.replace("hh", h + "")
    format2 = format2.replace("mm", m + "");
    format2 = format2.replace("ss", s + "");
    return "今天" + format2
  } else if (judge == 1) {
    let format2 = format.replace('yyyy-', '')
    format2 = format2.replace('MM-', "")
    format2 = format2.replace("dd", "")
    format2 = format2.replace("hh", h + "")
    format2 = format2.replace("mm", m + "");
    format2 = format2.replace("ss", s + "");
    return '昨天' + format2
  } else {
    let format2 = format.replace('yyyy-', y + '年')
    format2 = format2.replace('MM-', M + "月")
    format2 = format2.replace("dd", d + "日")
    format2 = format2.replace("hh", h + "")
    format2 = format2.replace("mm", m + "");
    format2 = format2.replace("ss", s + "");
    return format2
  }
}