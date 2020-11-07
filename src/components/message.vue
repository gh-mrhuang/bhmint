<template>
  <div class="messgae">
    <div class="message-head">
      <mt-icon name="icon-keyboardarrowleft" size="30px" @click="back"></mt-icon>
      个人信息
    </div>

    <div class="message-content">
      <div>
        <div class="message-content_headimage">
          <mt-image :src="logoSrc" width="60px" height="60px"></mt-image>
          长大山
        </div>
        <div class="message-content_sex">
          <mt-icon :name="0 ? 'icon-male' : 'icon-female'"></mt-icon>
          {{0 ? '男' : '女'}}
        </div>
      </div>
    </div>

    <div class="message-box">
      <div>
        <div class="home-task_item">
          <div>工资</div><div>2020年10月</div>
        </div>
        <div class="home-task_item">
          <div>实发</div><div class="red">¥10000</div>
        </div>
      </div>
      <div>
        <div class="home-task_item">
          <div>校园卡</div><div>2020年10月</div>
        </div>
        <div class="home-task_item">
          <div>余额</div><div class="red">¥10000</div>
        </div>
      </div>
      <div>
        <div class="home-task_item">
          <div>邮箱</div><div>2020年10月</div>
        </div>
        <div class="home-task_item">
          <div>未读邮件</div><div class="red">10000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/imgs/_logo.png'
export default {
  data () {
    return {
      logoSrc: logo,
    }
  },
  components:{
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.messgae {
  height: 100vh;
  background-color: #eee;
}
.message-head {
  height: 44px;
  line-height: 44px;
  text-align: center;
  position: relative;
}
.message-head > span:nth-child(1) {
  position: absolute;
  left: 8px;
}
.message-content {
  height: 150px;
  background: #3D3D44;
  overflow: hidden;
  /* border-radius: 0 0 30px 30px; */
}
.message-content > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding: 0 20px 0 24px;
  font-size: 20px;
  color: #FFFFFF;
}
.message-content_headimage img {
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid #5A5A5F;
  box-sizing: border-box;
}
.message-content_sex {
  font-size: 14px;
}
.message-box {
  margin-top: -30px;
}
.message-box > div {
  width: 90%;
  height: 100px;
  background: #FFFFFF;
  border-radius: 12px;
  margin: 0 auto 17px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.home-task_item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.home-task_item > div:nth-child(2) {
  color: #8E8E93;
}
.message-box > div .home-task_item:nth-child(2) {
  color: #8E8E93;
}
.message-box > div .home-task_item:nth-child(2) .red {
  color: red;
  font-weight: 700;
}
</style>
