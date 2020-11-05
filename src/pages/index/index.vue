<template>
  <div class="page_border">

    <div class="home-header">
      <mt-image :src="logoSrc" width="31px" height="27px"></mt-image>
      <div class="home-header_div">
        <span>苏州工艺美术职业技术学院</span>
        <mt-icon name="icon-wodexinxixuanzhong" class="home-header_icon" size="27px" @click="handlerOpen"></mt-icon>
      </div>
    </div>

    <mt-search
      v-model="searchVal"
      placeholder="请搜索移动服务">
    </mt-search>

    <mt-swipe :auto="4000" class="home-swipe">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>

    <van-collapse v-model="activeCollapse">
      <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>

    <mt-popup
      class="home-popup"
      v-model="popupVisible">
      <div class="home-popup_content">
        <div>
          <mt-icon name="icon-pinglun"></mt-icon>
          <span class="home-popup_item">个人信息</span>
        </div>
        <div>
          <mt-icon name="icon-pinglun"></mt-icon>
          <span class="home-popup_item">修改密码</span>
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script type="text/javascript">
import logo from '@/assets/imgs/_logo.png'

export default {
  data(){
    return {
      logoSrc: logo,
      popupVisible: false,
      searchVal: '',
      activeCollapse: [],
    }
  },
  components: {
  },
  mounted(){
    // global.SDK.setTitleText("首页")
  },
  methods: {
    handlerOpen() {
      this.popupVisible = true
    }
  }
}
</script>

<style scoped>
.page_border {
  background: #F7F7F7;
  width: 100vw;
}
.home-header {
  height: 50px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  padding: 0 17px 0 13px;
}
.home-header > img {
  margin-right: 6px;
}
.home-header_div {
  flex: 1;
  line-height: 50px;
}
.home-header_icon {
  float: right;
  height: 50px;
}
.home-popup {
  position: unset;
  transform: unset;
}
.home-popup_content {
  left: unset;
  position: fixed;
  right: 0;
  top: 42px;
  width: 133px;
  height: 100px;
  background: #F7F7F7;
  box-shadow: 0px 0px 5px rgba(236,239,246,0.20);
}
.home-popup_content > div {
  display: flex;
  align-items: center;
  padding: 0 17px 0 20px;
  height: 50px;
}
.home-popup_content .home-popup_item {
  margin-left: 12px;
  font-size: 17px;
  color: #3D3D44;
}
.home-swipe {
  height: 161px;
}
</style>

<style>
.page_border .v-modal {
  background-color: transparent;
}
.page_border .mt-bColor-grey-lv5 {
  background-color: #fff;
}
.page_border .mt-bg-lv3 {
  background-color: #F7F7F7;
}
.page_border .mt-bg-lv1 {
  background-color: #fff;
}
</style>
