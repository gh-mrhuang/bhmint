<template>
  <div class="page_border">

    <div class="home-head_fixed">
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
    </div>

    <div v-if="swipeList.length">
      <mt-swipe :auto="5000" class="home-swipe">
        <mt-swipe-item
          v-for="(item, index) in swipeList"
          :key="index"
        >
          <mt-image :src="item.ZQPICURL" width="auto" height="161px"></mt-image>
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
            <div>{{getCreatedTime(item.createTime)}}</div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <van-collapse v-model="activeCollapseAllways" class="home-task">
      <van-collapse-item title="常用服务">
        <div class="home-server_oa">
          <div
            v-for="item in cyServerList"
            :key="item.WID"
            @touchstart="startTouch(item.APPID)"
            @touchend="endTouch"
            @click="openUrl(item.APPID, 1)"
            class="home-server_oaitem">
            <mt-image :src="item.PICSRC" width="40px" height="40px"></mt-image>
            <div>{{item.APPNAME}}</div>
          </div>
          <div class="home-server_oaitem" @click="openPopup()">
            <div class="home-server_add">+</div>
            <div>添加服务</div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div class="home-server">
      所有服务
    </div>

    <van-collapse v-model="activeCollapseServer" class="home-server_details">

      <van-collapse-item title="" v-for="item in allServerList" :key="item.categoryId">
        <template #title>
          <div>
            <!-- <mt-icon name="icon-wodezixun-" /> -->
            {{item.categoryName}} ({{item.apps.length}})
          </div>
        </template>
        <div class="home-server_oa">
          <div v-for="e in item.apps" :key="e.appId" class="home-server_oaitem" @click="openUrl(e.openUrl)">
            <mt-image :src="e.iconUrl" width="40px" height="40px"></mt-image>
            <div>{{e.name}}</div>
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

    <mt-popup
      v-model="serverPopupVisible"
      position="bottom">
      <p style="height: 40px;line-height: 40px;color: #0a6bb7;text-align: right;padding-right: 20px;"><span @click="closePop">关闭</span></p>
      <div class="home-serve-List">
        <div v-for="item in appAllList" :key="item.appId" class="home-server_oaitem" @click="clickServer(item)">
          <div>
            <mt-image :src="item.iconUrl" width="40px" height="40px"></mt-image>
            <div class="home-server_add">+</div>
          </div>
          <div>{{item.name}}</div>
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script type="text/javascript">
import logo from '@/assets/imgs/_logo.png'
import { MessageBox } from 'bh-mint-ui2';
import { Toast } from 'bh-mint-ui2';

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
      allServerList: [],
      taskList: [
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
        {title: '123', date: '2020/09/11'},
      ],
      cyServerList: [],
      touchTimeID: '',
      serverPopupVisible: false
    }
  },
  watch: {
    searchVal(val) {
      this.getAllServerList(() => {
        this.allServerList = this.allServerList.filter(item => {
          item.apps = item.apps.filter(eve => !val || eve.name.includes(val))
          return item.apps.length
        })
      })
    }
  },
  computed: {
    appAllList() {
      const arr = []
      if (Array.isArray(this.allServerList)) {
        this.allServerList.forEach(item => {
          if (!Array.isArray(item.apps)) return
          item.apps.forEach(eve => {
            if(arr.includes(eve.appId) || this.cyServerList.some(e => e.APPID === eve.appId)) return
            arr.push(eve)
          })
        })
      }
      return arr
    }
  },
  created(){
    // global.SDK.setTitleText("首页")
    this.getSwipeList()
    this.getCyServerList()
    this.getAllServerList()
    this.getTaskList()
  },
  methods: {
    closePop() {
      this.serverPopupVisible = false;
    },
    getSwipeList(cb = () => {}) {
      // 轮播图
      this.$get('https://imy.sgmart.edu.cn/psfw/sys/smgxwfbxt/xyyw/getGGInfo.do').then(res => {
        this.swipeList = Array.isArray(res.data) ? res.data : []
        this.swipeList.map(item => {
          item.ZQPICURL = item.ZQPICURL ? item.ZQPICURL : 'https://imy.sgmart.edu.cn/new/mobile/dist/_logo.png?7c625c7ee388deb94cebe3d22ca7bb49';
          return item;
        })
        cb()
      })
    },
    getCyServerList(cb = () => {}) {
      // 常用服务
      this.$get('https://imy.sgmart.edu.cn/psfw/sys/smgzdycdlxt/zdycdl/getYdCollectAppList.do').then(res => {

        this.cyServerList = Array.isArray(res.data) ? res.data : []
        cb()
      })
    },
    getAllServerList(cb = () => {}) {
      // 所有应用
      this.$get('https://imy.sgmart.edu.cn/newmobile/client/userAppListGroupByCategory').then(res => {
        this.allServerList = res.data.datas || []
        cb()
      })
    },
    getTaskList(cb = () => {}) {
      // 代办任务
      this.$jsonp({
        url: 'https://imy.sgmart.edu.cn/taskcenterapp/sys/taskCenter/portalDataReceive/getAllPortalTask.do',
        // params: {_: 1604715457736},
        success: (data) => {
          this.taskList = data.queryTodoTask
          cb()
        }
      })
    },
    handlerOpen() {
      this.popupVisible = true
    },
    handleMessage() {
      this.$router.push('message')
    },
    handlePassword() {
      location.href = 'https://authserver.sgmart.edu.cn/authserver/mobilePasswordChange.do'
    },
    openUrl(data, flag = 0) {
      if (flag === 1) {
        data = `https://imy.sgmart.edu.cn/appShow?appId=${data}`
      }
      location.href = data
    },
    getCreatedTime(data) {
      return data.split(' ')[0]
    },
    startTouch(id) {
      clearTimeout(this.touchTimeID);
      this.touchTimeID = setTimeout(() => {
        this.openDeleteDialog(id)
      }, 1000)
    },
    endTouch() {
      clearTimeout(this.touchTimeID);
    },
    openDeleteDialog(id) {
      MessageBox.confirm('确认删除此常用服务？', '提示').then(res => {
        if (res !== 'confirm') return
        this.$get(
          'https://imy.sgmart.edu.cn/psfw/sys/smgzdycdlxt/zdycdl/DeleteYdCollectApp.do',
          { appId: id }
        ).then(res => {
          this.getCyServerList(() => {
            Toast({
              message: '删除成功',
              position: 'top',
              duration: 1000
            })
          })
          
        }).catch(err => {
          Toast({
            message: '删除失败',
            position: 'top',
            duration: 1000
          })
        })
      })
    },
    openPopup() {
      this.serverPopupVisible = true
    },
    clickServer(data) {
      this.$get(
        'https://imy.sgmart.edu.cn/psfw/sys/smgzdycdlxt/zdycdl/AddYdCollectApp.do',
        {
          data: JSON.stringify({appId: data.appId,appName: encodeURI(data.name),picSrc: data.iconUrl})
        }
      ).then(res => {
        this.getCyServerList(() => {
          Toast({
            message: '添加成功',
            position: 'top',
            duration: 1000
          })
        })
      })
    }
  }
}
</script>

<style scoped>
  .mint-swipe-items-wrap>div{
    text-align: center;
  }
.page_border {
  background: #F7F7F7;
  width: 100vw;
  padding-top: 95px;
}
.home-head_fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
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
  /* background-color: transparent; */
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
  flex-wrap: wrap;
}
.home-server_oaitem {
  width: 25%;
  height: 85px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home-server_oaitem .home-server_add {
  width: 40px;
  height: 40px;
  background: #DFDFDF;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  line-height: 32px;
  text-align: center;
}
.home-server_oaitem > div:nth-child(1) {
  position: relative;
}
.home-server_oaitem > div:nth-child(1) > .home-server_add {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 0;
  top: 0;
  line-height: 14px;
  font-size: 14px;
}
.home-server_oaitem > div:nth-child(2) {
  width: 80%;
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
.home-serve-List {
  height: 50vh;
  overflow: auto;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}
</style>
