// miniprogram/pages/tree_branch/tree_branch.js
let utils = require('../../utils/utils.js');

function downloadImg(url) {
  wx.downloadFile({
    url: url,
    filePath: '../../images',
    success(res) {
      console.log('图片下载完毕');
    }
  })
}

function db(content) {
  console.log('链接数据库');
  let _this = this;
  wx.cloud.init();
  const db = wx.cloud.database({
    env: 'pk4-ghl0d'
  });
  let user_content = db.collection('publish_content');
  let avator = '',
    nickname = '';
  wx.getUserInfo({
    success: (res) => {
      avator = res.userInfo.avatarUrl;
      nickname = res.userInfo.nickName;
      user_content.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          avatorUrl: avator,
          content: content,
          goods: "",
          imageUrl: _this.data.imgUrl,
          name: nickname,
          publish_time: utils.get_time(),
          goodsid: [],
          comments: []
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          wx.reLaunch({
            url: '../tree_hole/tree_hole',
          })
        },
        fail(e) {
          console.log(e);
        }
      })
    },
    fail(e) {
      console.log(e);
    }
  })

}
//将本地图片上传服务器
function img_upload(url, filePath) {
  let _this = this;
  wx.cloud.init();
  wx.cloud.uploadFile({
    cloudPath: url, // 上传至云端的路径
    filePath: filePath, // 小程序临时文件路径
    success: res => {
      wx.cloud.getTempFileURL({
        fileList: [{
          fileID: res.fileID
        }]
      }).then((res) => {
        _this.setData({
          imgUrl: res.fileList[0].tempFileURL
        })
      }).then(() => {
        db.call(_this, _this.data.content);
      })
    },
    fail: console.error
  })
}
Page({

  /**
   * 页面的初始数据
   */
  // 是用来存储输入的数据
  preview(e) {
    console.log(e);
    wx.previewImage({
      urls: [this.data.imgUrl],
    })
  },
  content(e) {
    this.setData({
      content: e.detail.value
    })
  },
  upload() {
    console.log('上传照片');
    let _this = this;
    //一个是照片的url存在数据库，一个是照片本身放在云上
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res);
        _this.setData({
          imgUrl: res.tempFilePaths[0],
          clear: ''
        })
      }
    })
  },
  delete_img() {
    console.log('删除图片')
    this.setData({
      imgUrl: '',
      clear: "none"
    })
  },
  sending() {
    let _this = this;
    wx.getStorage({
      key: '_openid',
      success(res) {
        console.log(res);
        if (_this.data.content.length) {
          //现在要做的事情是把用户输出的content上传到数据库，图片上传到存储。
          console.log('正在上传图片和上传用户信息');
          wx.showLoading({
            title: '发送中...',
            success() {
              setTimeout(() => {
                wx.hideLoading({
                  success: (res) => {
                    wx.showToast({
                      title: '发表成功'
                    })
                  },
                })
              }, 2000)
            }
          });
          // 第一步先上传照片
          img_upload.call(_this, 'heart/' + res.data + Date.now(), _this.data.imgUrl);
          //第二部将上传的图片同步存储到image文件夹
          //将发表内容存入数据库

        } else {
          wx.showToast({
            title: '至少20字',
            icon: 'none'
          })
        }
      },
      fail(res) {
        //没有登陆我们就提示加跳转
        console.log(res);
        wx.showToast({
          title: '请先登陆',
          icon: 'loading',
          success() {
            wx.navigateTo({
              url: '../../pages/tree_register/tree_register',
            })
          }
        })
      }
    });
  },
  data: {
    content: '',
    imgUrl: '',
    clear: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('tree_branch-onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('tree_branch-onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('tree_branch-onshow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('tree_branch-onhide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('tree_branch-onUnload');
    this.setData({
      imgUrl: ''
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('tree_branch-onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('tree_branch-onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('tree_branch-onShareAppMessage');
  }
})