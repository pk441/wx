// miniprogram/components/hole-login/hole-login.js
Component({
  properties: {

  },
  data: {

  },
  methods: {
    formsubmit(e) {
      // /点击提交的时候链接数据库/
      // const user = wx.cloud.database({
      //   env: "pk4-ghl0d"
      // });
      // const users = user.collection('user');

      let username = e.detail.value.username;
      let password = e.detail.value.password;

      // 数据库验证操作,此类操作最好放在父级用，组件尽可能保证其开放性能
      wx.cloud.init();
      const db = wx.cloud.database({
        env: 'pk4-ghl0d'
      });
      const user = db.collection('user');
      const _this = this;
      user.where({
        username: username,
        password: password
      }).get({
        success(res) {
          if (res.data.length == 0) {
            console.log('没找到');
            wx.showToast({
              title: '登陆失败',
              icon: 'none'
            })
          } else {
            console.log(res, '找到了');
            //这里我们要做的是将登陆的信息存入缓存中，主要指的是将登陆用户_openid存入缓存中，在后期进行页面操作的时候，我们要进行检查她是否有权进行这个操作，同时根据这个信息，我们操作与其匹配的说说。总之这个方法是否可行，我们和wx.login方法还得做验证。
            wx.clearStorage({
              complete: (res) => {
                console.log('缓冲清理完毕')
              },
            })
            wx.setStorage({
              data: res.data[0]._openid,
              key: '_openid',
            });
            console.log('用户id已经存入缓存')
            _this.triggerEvent('mysubmit', {}, {});
          }
        },
        fail() {
          wx.showToast({
            title: '登陆失败',
            icon: 'none'
          })
        }
      })




    },
    hole_register() {
      console.log('跳转触发');
      this.triggerEvent('treelogin', {}, {});
    },

  }
})