import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
const amap = {
  map() {
    const map = shallowRef(null);
    return {
      map,
    }
  },
  initMap() {
    AMapLoader.load({
      key: "d7b32628b530237f6b174e2d05de3252",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.HawkEye',
        'AMap.MapType',
        'AMap.Geolocation'
      ],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      this.map = new AMap.Map("container", {  //设置地图容器id
        zoom: 5, //初始化地图层级
        viewMode: "3D", //是否为3D地图模式
        center: [116.397436, 39.909165], //初始化地图中心点位置
        dragEnable: true, //禁止鼠标拖拽
        scrollWheel: true, //鼠标滚轮放大缩小
        doubleClickZoom: true, //双击放大缩小
        keyboardEnable: true, //键盘控制放大缩小移动旋转
      });
      // this.map.addControl(new AMap.Scale());
      this.map.addControl(new AMap.Geolocation());//获取当前位置
      this.map.addControl(new AMap.MapType());//地图类型

      let ToolBar = new AMap.ToolBar({
        position: 'LB'
      })
      this.map.addControl(ToolBar)

      let Scale = new AMap.Scale({
        position: 'RB'
      })
      this.map.addControl(Scale)

      let HawkEye = new AMap.HawkEye({
        position: "LT", //小地图控件停靠位置（LT/RT/LB/RB）
      });
      this.map.addControl(HawkEye)

      let markerPoint = new AMap.Marker({
        position: [111.668301, 29.046483], // 基点坐标
        offset: new AMap.Pixel(-12, -32), // //标记点相对偏移量，可以固定其地址，不随着地图缩放而偏移
        draggable: false, //点标记对象是否可拖拽移动
        defaultCursor: 'pointer'
      });
      this.map.add(markerPoint); // 地图添加标记


      //为地图注册click事件获取鼠标点击出的经纬度坐标
      this.map.on("click", function (e) {
        console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
      });
    }).catch(e => {
      console.log(e);
    })
  },
}
export default amap