<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import tableCom from '../components/table.vue'
import menu_info from '../ts/menu_info'
import variation from '../charts/strip'
import xAxis from '../charts/xAxis'
import change_xAxis from '../charts/change_xAxis'
import round from '../charts/round'
import amap from '../map/amap'
import ajax from '../ts/ajax'
import music from '../components/sundry/music'
const router = useRouter()
const data = reactive({
  l_width: "15%",
  r_width: "85%",
  display: false,
  tab: '1',
  children_tab: '0',
  menu_info: menu_info,
  data_font: '',
  img_src: '',
  music: {},
  smooth: false,
  dark: false,
  tableShow: true,
  list: []
})

watch(() => data.smooth, () => {
  xAxis('xAxis', data.smooth, data.dark)
})
watch(() => data.dark, () => {
  data.dark ? xAxis('xAxis', data.smooth, "dark") : xAxis('xAxis', data.smooth, "")
  data.tableShow = false
  setTimeout(() => {
    data.tableShow = true
  }, 10);

})

onMounted(() => {
  GetAllList()
  getfont()
  getimg()
  get_music()
  watch(() => data.tab, () => {
    watch(() => data.children_tab, () => {
      if (data.tab == '2' && data.children_tab == '2-1') {
        variation.variation("main")
      }
      if (data.tab == '2' && data.children_tab == '2-2') {
        round.variation('round')
      }
      if (data.tab == '2' && data.children_tab == '2-3') {
        xAxis('xAxis', data.smooth, "dark")
      }
      if (data.tab == '2' && data.children_tab == '2-4') {
        change_xAxis('change')
      }
      if (data.tab == '3' && data.children_tab == '3-2') {
        ajax.Get_Img('https://api.paugram.com/bing/', {}, (res) => {
          data.img_src = res
        })
      }
      if (data.tab == '3' && data.children_tab == '3-1') {
        getimg()
      }
      if (data.tab == '4' && data.children_tab == '4-1') {
        amap.initMap()
      }
      if (data.tab == '3' && data.children_tab == '3-3') {
        music(data.music, 'music_div')
      }
    })
  })
})

const getfont = () => {
  ajax.get("http://api.btstu.cn/yan/api.php", {}, (res) => {
    data.data_font = res
  })
}

const getimg = () => {
  console.log("进入");

  ajax.Get_Img('https://api.paugram.com/wallpaper/', { source: 'gh' }, (res) => {
    data.img_src = res
    console.log(data.img_src);
  })
}

const get_music = () => {
  ajax.get("https://api.paugram.com/acgm/", { list: 1 }, (res: any) => {
    data.music = res
  })
}

const GetAllList = () => {
  let obj = {}
  menu_info.forEach(element => {
    obj[element.id] = element
  });
  menu_info.forEach(element => {
    const parent = obj[element.parent]
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(element)
    } else {
      data.list.push(element)
    }
  });
}

const Collapse = () => {
  data.display = !data.display
  if (data.r_width == '85%') {
    data.l_width = '5%'
    data.r_width = '95%'
  } else {
    data.l_width = "15%",
      data.r_width = "85%"
  }
}

const change = () => {
  getimg()
  getfont()
}

</script>
<template>
  <div class="main_css">
    <div class="left" :style="{ width: data.l_width }">
      <div class="main_Login">
        <img @click="router.push('/login')" src="../assets/LOGO.png" alt="">
      </div>
      <div class="p-2 m-2" v-if="!data.display">{{ data.data_font }}</div>
      <div class="item_container">
        <div v-for="l in data.list" class="item" :class="{ active: data.tab == l.id }" @click="data.tab = l.id">
          <div class="item_outer">
            <div class="item_img">
              <img :src="l.icon" alt="">
            </div>
            <div class="item_font" v-if="!data.display">{{ l.name }}</div>
          </div>
          <div class="other" v-if="l.children" :class="{ active: data.tab == l.id }">
            <div class="other_list" v-for="c in l.children" @click="data.children_tab = c.id" :class="{ active: data.children_tab == c.id }">
              <div class="item_img">
                <img :src="c.icon" alt="">
              </div>
              <div class="item_font" v-if="!data.display">{{ c.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <img class="left_icon" :class="{ active: data.l_width == '15%' }" src="../assets/icon/右箭头.png" alt="" @click="Collapse()">
    </div>
    <div class="right" :style="{ width: data.r_width }">
      <tableCom v-if="data.tab == '1'"></tableCom>
      <div v-if="data.tab == '2'">
        <div id="main" v-if="data.tab == '2' && data.children_tab == '2-1'"></div>
        <div id="round" v-if="data.tab == '2' && data.children_tab == '2-2'"></div>
        <div id="change" v-if="data.tab == '2' && data.children_tab == '2-4'"></div>
        <div class="xAxis" v-if="data.tab == '2' && data.children_tab == '2-3'">
          <el-form-item label="平滑曲线" class="w-full" style="display: flex;justify-content: center;">
            <el-switch v-model="data.smooth" />
          </el-form-item>
          <el-form-item label="深色模式" class="w-full" style="display: flex;justify-content: center;">
            <el-switch v-model="data.dark" />
          </el-form-item>
          <div v-show="data.tableShow" id="xAxis"></div>
        </div>
      </div>
      <div v-if="data.tab == '3'" class="data_font">
        <div v-if="data.tab == '3' && data.children_tab == '3-1'">{{ data.data_font }}</div>
        <img v-if="data.children_tab == '3-1' || data.children_tab == '3-2'" class=" w-3/4 h-3/4" :src="data.img_src" alt="">
        <el-link v-if="data.tab == '3' && data.children_tab == '3-1'" type="primary" @click="change()">换一个</el-link>
        <el-link v-if="data.tab == '3' && data.children_tab == '3-2'" type="primary" :href="data.img_src">下载</el-link>
        <div v-if="data.tab == '3' && data.children_tab == '3-3'" id="music_div"></div>
      </div>
      <div v-if="data.tab == '4'">
        <div id="container" v-if="data.tab == '4' && data.children_tab == '4-1'"></div>
        <div id="container" v-if="data.tab == '4' && data.children_tab == '4-2'">百度地图开发者申请过于过分，暂且不使用百度</div>
        <div id="container" v-if="data.tab == '4' && data.children_tab == '4-3'">暂时不使用腾讯地图</div>
      </div>
    </div>
  </div>
</template>
<style>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.data_font {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: 'kaiti';
  font-weight: 600;
}

.data_font img {
  border-radius: 15px;
  border: 5px solid #000;
}

.main_css {
  /* position: relative; */
  width: 100vw;
  min-width: 750px;
  height: 100vh;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  display: flex;
}

.left {
  @apply h-full bg-blue-400;
  position: relative;
  transform-origin: right center;
  transition: width 0.5s
}

.main_Login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main_Login img {
  width: 75%;
}

.left_icon {
  @apply w-12 bg-blue-100;
  border-radius: 50%;
  position: absolute;
  z-index: 100;
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.5s;
}

.left_icon.active {
  transform: rotateZ(180deg)
}

.right {
  @apply h-full bg-blue-100;
  transition: width 0.5s;
  transform-origin: left center;
}

.item_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item_outer {
  width: 100%;
  display: flex;
}

.other {
  width: 100%;
  padding: 0 10px;
  transform-origin: top center;
  height: 0px;
  transform: scaleY(0);
  /* transition: all 0.5s; */
}

.other.active {
  height: auto;
  transform: scaleY(1);
}

.other_list {
  width: 100%;
  display: flex;
  padding: 10px 0;
}

.other_list:hover {
  @apply bg-blue-600;
}

.other_list.active {
  @apply bg-blue-600;
}

.item {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s;
  cursor: pointer;
  padding: 10px 0;
}

.item:hover {
  @apply bg-blue-500;
}

.item.active {
  @apply bg-blue-500;
}

.item_img {
  flex: 1;
  display: flex;
  justify-content: center;
}


.item img {
  width: 1rem;
  height: 1rem;
}

.item_font {
  flex: 2;
  text-align: center;
}

.charts {
  width: 100%;
  height: 100%;
}

#main {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#round {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#change {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#xAxis {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>