import {
  assert
} from '../../utils/utils'
//
function db(e) {
  //数据库初始化
  wx.cloud.init();
  //用微信链接数据库,我们在这里单独建立了一个专门为授权登陆存储信息的数据库就叫做user_authorize
  const db = wx.cloud.database({
    env: 'pk4-ghl0d'
  });
  //连接到这个授权登陆的数据库
  const user = db.collection('user_authorize');
  //查询在这个库里面有没有授权过
  user.where({
    '_openid': e.userInfo._openid
  }).get({
    success(res) {
      //如果找到了，说明授权过，我们就可以让他直接登陆
      if (res.data.length) {
        console.log('正在登陆');
        wx.showLoading({
          title: '正在登陆...',
        })
        setTimeout(function () {
          wx.hideLoading({
            success() {
              wx.switchTab({
                url: '../../pages/tree_hole/tree_hole',
              })
            }
          })
        }, 2000)

      } else {
        user.add({
          data: e.userInfo,
          success(res) {
            wx.showLoading({
              title: '正在登陆...',
            })
            setTimeout(function () {
              wx.hideLoading({
                success() {
                  wx.switchTab({
                    url: '../../pages/tree_hole/tree_hole',
                  })
                }
              })
            }, 2000)
          },
          fail(err) {
            return false
          }
        });
      }
    }
  })
}
Component({
  properties: {

    //姓名查重
    name_repeat: {
      type: Boolean,
      value: false
    },
    //姓名验证flag
    name_err: {
      type: String,
      value: 'none'
    },
    name_succ: {
      type: String,
      value: 'x'
    },
    //密码验证flag 
    psw_err: {
      type: String,
      value: 'none'
    },
    psw_succ: {
      type: String,
      value: 'x'
    },
    //两次输入密码验证flag
    confirmpsw_err: {
      type: String,
      value: 'none'
    },
    confirmpsw_succ: {
      type: String,
      value: 'x'
    },
    //电话号码验证flag
    phone_err: {
      type: String,
      value: 'none'
    },
    phone_succ: {
      type: String,
      value: 'x'
    },
    vcode_err: {
      type: String,
      value: 'none'
    },
    vcode_succ: {
      type: String,
      value: 'x'
    },
    ok: {
      type: String,
      value: 'true'
    }
  },

  observers: {},

  data: {
    username: '',
    psw: '',
    psw_again: '',
    tel: '',

  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("hole-register attached")
    },
    moved: function () {
      console.log("hole-register moved")
    },
    detached: function () {
      console.log("hole-register detached")
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  methods: {

    // 表单提交
    formsubmit(e) {
      console.log(this.properties.name_succ == 'Y', this.properties.psw_succ == 'Y', this.properties.confirmpsw_succ == 'Y', this.properties.phone_succ == 'Y', this.properties.vcode_succ == 'Y');
      if (this.properties.name_succ == 'Y' && this.properties.psw_succ == 'Y' && this.properties.confirmpsw_succ == 'Y' && this.properties.phone_succ == 'Y' && this.properties.vcode_succ == 'Y') {
        console.log('form发生了submit事件，携带数据为:', e.detail.value);
        const db = wx.cloud.database({
          env: 'pk4-ghl0d'
        });
        const user = db.collection('user');
        user.add({
          data: e.detail.value,
          success(res) {
            console.log(res);
          },
          fail(err) {
            console.log(err);
          }
        });
        wx.showToast({
          icon: 'success',
          title: '注册成功',
          duration: 3000,
          success() {
            console.log('跳转至登陆页面');
            wx.navigateTo({
              url: '../../pages/tree_login/tree_login',
            })
          }
        })
      } else {
        console.log('注册失败');
      }

    },
    //用户名输入验证
    get_inputvalue(e) {
      /在组建内部实现判断/
      let username = e.detail.value;
      /姓名判断的正则/
      let regName = /^[\u4e00-\u9fa5]{2,6}$/;
      let keys = Object.keys(this.properties);
      let result = assert.call(this, regName, username, keys[0]);
      this.setData({
        name_err: result
      });
      if (this.properties.name_err == 'none' && username.length > 0 && !this.properties.name_repeat) {
        this.setData({
          name_succ: 'Y'
        })
      }
    },

    // 存储用户名字
    store_username(e) {
      if (e.detail.value) {
        this.data.username = e.detail.value
      } else {
        this.data.username = 'undefined';
      }
      const _this = this;
      //获取数据库的引用
      wx.cloud.init()
      const db = wx.cloud.database({
        env: 'pk4-ghl0d'
      });
      //获取数据库集合中引用
      const user = db.collection('user');
      user.where({
        username: this.data.username
      }).get({
        success(res) {
          console.log(res);
          //数据库里面没有，那么就不重名,
          if (res.data.length) {
            _this.setData({
              name_repeat: true
            })
          } else {
            _this.setData({
              name_repeat: false
            })
          }

        }
      })
    },

    // 登陆密码验证
    get_psw(e) {
      let password = e.detail.value;
      let regName = /^[a-zA-Z\d_]{8,}$/;
      let keys = Object.keys(this.properties);
      let result = assert.call(this, regName, password, keys[1]);
      this.setData({
        psw_err: result
      })
      if (this.properties.psw_err == 'none' && password.length > 0) {
        this.setData({
          psw_succ: 'Y'
        })
      }
    },

    //存储输入密码
    confirm(e) {
      this.data.psw = e.detail.value;
    },

    //两次密码校核
    confirm_psw(e) {
      if (e.detail.value !== this.data.psw) {
        //如果两次
        this.setData({
          confirmpsw_err: ""
        })
      } else {
        this.setData({
          confirmpsw_err: "none"
        });
        if (this.properties.confirmpsw_err == 'none' && e.detail.value.length > 0) {
          this.setData({
            confirmpsw_succ: 'Y'
          })
        }
      }
    },

    // 电话号码校核
    get_phonenumber(e) {
      let tel_phone = e.detail.value;
      /姓名判断的正则/
      let regName = /^1[3456789]\d{9}$/;
      let keys = Object.keys(this.properties);
      let result = assert.call(this, regName, tel_phone, keys[3]);
      this.setData({
        phone_err: result
      });
      if (this.properties.phone_err == 'none' && tel_phone.length > 0) {
        this.setData({
          phone_succ: 'Y'
        })
      }
    },
    //存储手机号码
    store_phone(e) {
      this.data.tel = e.detail.value;
    },


    //获取验证码
    get_Vecode() {
      wx.cloud.init();
      wx.cloud.callFunction({
        name: 'vcode',
        complete(e) {
          let title = String(e.result.code);
          wx.showToast({
            title: title,
            mask: 'true',
            icon: 'none',
            success() {
              // 把云函数返回的验证码存储在缓存中
              wx.setStorage({
                key: 'key',
                data: title
              });
            }
          });
        },
        fail(err) {
          console.log("错误信息:" + err);
        }
      })
    },

    //输入验证码
    vcode_input(e) {
      const _this = this;
      wx.getStorage({
        key: 'key',
        success(res) {
          if (res.data !== e.detail.value) {
            _this.setData({
              vcode_err: ''
            })
          } else {
            _this.setData({
              vcode_err: 'none'
            })
            if (_this.properties.vcode_err == 'none' && e.detail.value.length > 0) {
              _this.setData({
                vcode_succ: 'Y'
              })
            }
          }
        },
        fail(e) {
          console.log(e);
        }
      });
    },
    //已有账号，点我登陆功能
    hole_login() {
      console.log('准备跳转至登陆页面');
      wx.navigateTo({
        url: '../../pages/tree_login/tree_login',
      })
    },
    //授权登陆
    wx_login(res) {
      wx.showToast({
        title: '准备登陆',
      });
      console.log('获取微信授权');
      let _this = this;
      wx.cloud.init();
      wx.cloud.callFunction({
        name: 'vlogin',
        success: res => {
          let _openid = res.result.openid;
          //将授权后的openid存储在本地缓存中
          console.log('id是:'+_openid);
          wx.setStorage({
            data: _openid,
            key: '_openid',
          });
          wx.getUserInfo({
            success(res) {
              console.log(res);
              //授权成功,同步完成在数据中插入一个这样的用户信息，username=nickname,不设置密码，数据库的结构设计上我们采用和小程序获取到的信息的数据结构设计。
              db(res);
            },
            fail(e){
              console.log('错误信息:',e)
            }
          })
        }
      })
    },
  }
})