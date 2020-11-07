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

    <div v-if="swipeList.length">
      <mt-swipe :auto="5000" class="home-swipe">
        <mt-swipe-item
          v-for="(item, index) in swipeList"
          :key="index"
        >
          <mt-image :src="item.ZQPICURL" width="100%" height="161px"></mt-image>
          <div class="home-swipe_title">{{item.TITLE}}</div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div v-else>
      <mt-image :src="logoSrc" width="100%" height="161px"></mt-image>
    </div>

    <van-collapse v-model="activeCollapseTask" class="home-task">
      <van-collapse-item title="">
        <template #title>
          <div>
            代办任务
            <mt-badge type="danger" size="small" class="home-task_icon">{{taskList.taskDataTotal}}</mt-badge>
          </div>
        </template>
        <div v-for="(item, index) in taskList.taskData" :key="index">
          <div @click="openUrl(item.formUrl)" class="home-task_item">
            <div>{{item.subject}}</div>
            <div>{{item.createTime}}</div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- <van-collapse v-model="activeCollapseAllways" class="home-task">
      <van-collapse-item title="常用服务">内容</van-collapse-item>
    </van-collapse> -->

    <div class="home-server">
      所有服务
    </div>

    <van-collapse v-model="activeCollapseServer" class="home-server_details">
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            OA办公
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in oaList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            党办校办
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in dxList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            组织人事
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in zrList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            教学管理
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in jgList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            质量控制
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in zkList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            学生工作
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="(item, index) in xgList" :key="index" class="home-server_oaitem">
            <mt-image :src="item.src" width="40px" height="40px"></mt-image>
            <div>{{item.title}}</div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div class="home-bottom">Copyright 2018 苏州工艺美术职业技术学院 All Right Reserved</div>

    <mt-popup
      class="home-popup"
      v-model="popupVisible">
      <div class="home-popup_content">
        <div @click="handleMessage">
          <mt-icon name="icon-wodezixun-"></mt-icon>
          <span class="home-popup_item">个人信息</span>
        </div>
        <div @click="handlePassword">
          <mt-icon name="icon-shezhi"></mt-icon>
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
      activeCollapseTask: [],
      activeCollapseAllways: [],
      activeCollapseServer: [],
      swipeList: [],
      taskList: [
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
      ],
      oaList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
      dxList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
      zrList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
      jgList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
      zkList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
      xgList: [
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
        {src: logo, title: 1234},
      ],
    }
  },
  components: {
  },
  created(){
    // global.SDK.setTitleText("首页")
    this.$get('https://imy.sgmart.edu.cn/psfw/sys/smgxwfbxt/xyyw/getGGInfo.do').then(res => {
      this.swipeList = res
    })
    this.$jsonp({
      url: 'https://imy.sgmart.edu.cn/taskcenterapp/sys/taskCenter/portalDataReceive/getAllPortalTask.do',
      // params: {_: 1604715457736},
      success: (data) => {
        this.taskList = data.queryTodoTask
      }
    })
  },
  methods: {
    handlerOpen() {
      this.popupVisible = true
    },
    handleMessage() {
      this.$router.push('message')
    },
    handlePassword() {

    },
    openUrl(data) {
      location.href = data
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
.home-swipe_title {
  height: 28px;
  line-height: 28px;
  background: rgba(0,0,0,0.60);
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  font-size: 15px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.home-server {
  background: #FFFFFF;
  padding-left: 17px;
  line-height: 56px;
  margin-top: 10px;
  border-bottom: 1px solid #eee;
}
.home-server_details .mint-icon {
  margin-right: 10px;
}
.home-task {
  margin-top: 10px;
}
.home-task_icon {
  width: 18px;
  height: 18px;
  line-height: 14px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 0;
  margin-left: 4px;
}
.home-task_item {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.home-task_item > div:first-child {
  width: 70%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 17px;
  color: #2B2B33;
}
.home-task_item > div:last-child {
  font-size: 11px;
  color: #999;
}
.home-bottom {
  height: 39px;
  padding: 12px 32px 10px;
  text-align: center;
  font-size: 11px;
  color: #B1B1B1;
  letter-spacing: 0;
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
.home-task .van-collapse-item__content {
  padding: 0 17px;
}
.home-server_oa {
  display: flex;
}
.home-server_oaitem {
  width: 85px;
  height: 85px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home-server_oaitem div {
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #3D3D44;
  margin-top: 8px;
}
.home-swipe .mint-swipe-indicators {
  bottom: 35px;
}
</style>
