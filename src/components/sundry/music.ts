export default function music(music: object, id: string) {
  let container = document.getElementById(id)
  container.style.width = "100%"
  container.style.height = "100%"
  container.style.backgroundColor = "tomato"
  container.style.position = "relative"
  container.style.display = "flex"
  container.style.justifyContent = "center"
  container.style.alignItems = "center"
  container.style.flexDirection = "column"
  container.style.zIndex = "0"
  // 专辑图片
  const music_img = document.createElement('img')
  music_img.setAttribute("src", music.cover)
  music_img.style.width = "300px"
  music_img.style.height = '300px'
  music_img.style.borderRadius = "50%"
  music_img.style.backgroundSize = "100% 100%"

  // 播放器
  const audioObj = new Audio();
  audioObj.controls = true
  const source = document.createElement('source')
  source.setAttribute('src', music.link)
  source.type = "audio/mpeg"
  audioObj.append(source)
  audioObj.style.width = "400px"
  audioObj.style.height = "40px"

  container?.appendChild(music_img)
  container?.appendChild(audioObj)
}