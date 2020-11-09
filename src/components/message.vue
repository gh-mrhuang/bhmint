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
          {{personDetail.userName}}
        </div>
        <div class="message-content_sex">
          <mt-icon :name="personDetail.userSex === '男' ? 'icon-male' : 'icon-female'"></mt-icon>
          {{personDetail.userSex}}
        </div>
      </div>
    </div>

    <div class="message-box">
      <div v-for="item in messageList" :key="item.wid">
        <div class="home-task_item">
          <div>{{item.title}}</div>
          <div>
            <span @click="openUrl(item)">
              {{item.hpHide ? '' : item.title === '邮箱' ? item.subTitle : getMessage(item, item.subTitle, 0)}}
            </span>
            <template v-if="item.title === '邮箱'">
              <span @click="bindEmail" v-if="item.hpHide || !item.subTitle">绑定</span>
              <span v-else @click="unBindEmail">解绑</span>
            </template>
          </div>
        </div>
        <div class="home-task_item" v-if="!item.hpHide">
          <div>
            {{
              item.title === '邮箱' ? 
              item.imptInfo.replace(/(\D*)\d\D/, '$1') :
              getMessage(item, item.subTitle, 1)
            }}
          </div>
          <div class="red">
            {{
              item.title === '邮箱' ?
              item.imptInfo.replace(/\D*(\d*)\D/, '$1') :
              item.imptInfo
            }}
          </div>
        </div>
      </div>

      <mt-popup
        v-model="emailPopup"
        position="bottom">
        <div class="home-serve-List">
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" />
          <mt-field label="" v-model="emailType" disabled></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" />
          <mt-button type="primary" @click="cancelEmail" size="large">取消</mt-button>
          <mt-button type="primary" @click="confrimEmail" size="large">确认</mt-button>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/imgs/_logo.png'
import { Toast } from 'bh-mint-ui2';
import { encode } from 'js-base64';
export default {
  data () {
    return {
      logoSrc: logo,
      messageList: [],
      personDetail: {},
      emailPopup: false,
      email: '',
      password: '',
      emailType: '@sgmart.edu.cn',
      userEmail: ''
    }
  },
  created() {
    this.initMessage()
  },
  methods: {
    initMessage() {
      this.$get('https://imy.sgmart.edu.cn/jsonp/personalRemind/getView.do').then(res => {
        this.messageList = res.data.visibleList || []
        this.messageList.forEach(item => {
          this.$get(
            'https://imy.sgmart.edu.cn/jsonp/personalRemind/getViewDataDetail.do',
            {
              wid: item.wid,
              mailAccount: item.mailAccount
            }
          ).then(data => {
            if (!data.data[0]) {
              this.$set(item, 'hpHide', true)
              return
            }
            Object.assign(item, data.data[0])
            if (item.title === '邮箱') {
              this.userEmail = item.subTitle
            }
          })
        })
      })
      this.$get('https://imy.sgmart.edu.cn/jsonp/userDesktopInfo.json').then(res => {
        this.personDetail = res.data
      })
    },
    back() {
      this.$router.back()
    },
    getMessage(item, param, index) {
      let res = ''
      const arr = param.split('|')
      if (arr.length === 2)  {
        res = arr[index].trim()
      }
      if (item.hpHide) {
        res = ''
      }
      return res
    },
    bindEmail() {
      this.emailPopup = true
    },
    unBindEmail() {
      this.$get(
        'https://imy.sgmart.edu.cn/jsonp/personalRemind/unBindMail.do',
        {
          unbindList: this.userEmail,
        }
      ).then(res => {
        Toast({
          message: '绑定成功',
          position: 'top',
          duration: 1000
        })
        this.emailPopup = false
        this.initMessage()
      })
    },
    cancelEmail() {
      this.emailPopup = false
      this.email = ''
      this.password = ''
    },
    confrimEmail() {
      if (!this.email || !this.password) return
      const result = encode(this.password);  
      this.$get(
        'https://imy.sgmart.edu.cn/jsonp/personalRemind/bindMail.do',
        {
          mailName: this.email,
          mailPasswd: result,
          mailDomain: this.emailType.replace('@', ''),
        }
      ).then(res => {
        Toast({
          message: '绑定成功',
          position: 'top',
          duration: 1000
        })
        this.userEmail = this.email
        this.emailPopup = false
      }).catch((err) => {
        Toast({
          message: '绑定失败',
          position: 'top',
          duration: 1000
        })
      })
    },
    openUrl(param) {
      if (param.title !== '邮箱' || param.hpHide || !param.subTitle) return
      this.$get(
        'https://imy.sgmart.edu.cn/jsonp/personalRemind/getLinkUrl.do',
        {
          mailAccount: this.userEmail,
        }
      ).then(res => {
        this.emailPopup = false
        this.initMessage()
        location.href = res.data.linkUrl
      }).catch(err => {
        Toast({
          message: '跳转失败',
          position: 'top',
          duration: 1000
        })
      })
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
  font-size: 10px;
}
.message-box > div .home-task_item:nth-child(2) {
  color: #8E8E93;
}
.message-box > div .home-task_item:nth-child(2) .red {
  color: red;
  font-weight: 700;
}
.message-box > .mint-popup {
  height: unset;
}
.message-box .home-serve-List {
  height: 50vh;
  overflow: auto;
}
.mint-button--large {
  margin-top: 12px;
}
</style>
