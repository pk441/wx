// miniprogram/pages/detail/detail.js

let {get_time,compare} = require('../../utils/utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    userInfo: {},
    comment:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //评论数据库存储工作
  comment_db(id,msg){
    console.log(id,msg)
    let _this = this;
    this.data.userInfo.comments.push(msg);
    let comments=this.data.userInfo.comments;
    console.log(comments);
    const envname = 'pk4-ghl0d'
    wx.cloud.init();
    const db = wx.cloud.database({
      env: envname
    }).collection('publish_content');
    db.doc(id).update({
      data:{
        comments:comments
      },
      success:function(res){
        console.log("发表数据已经保存到数据库");
      }
    })
  },
  // 关联数据
  db(id) {
    let _this = this;
    const envname = 'pk4-ghl0d'
    wx.cloud.init();
    const db = wx.cloud.database({
      env: envname
    }).collection('publish_content');
    db.doc(id).get({
      success: function (res) {
        console.log('关联数据', res.data.comments);
        res.data.comments.sort(compare);
        _this.setData({
          userInfo: res.data,
        });
      },
      fail(e) {
        console.log(e);
      }
    })
    
  },
  inputing:function(ev){
    this.setData({
      comment:ev.detail.value
    });
  },
  send_comment: function () {
    console.log('准备发送评论');
    let id = wx.getStorageSync('_openid');
    if (id) {
      let _this=this;
      //接下来要做的操作就是把当前登陆用户的部分信息和评论内容插入到数据库里面
      wx.getUserInfo({
        success:function(res){
          console.log(res.userInfo);
          let msg={};
          msg.name=res.userInfo.nickName;
          msg.avatarUrl=res.userInfo.avatarUrl;
          msg._openid=id;
          msg.comment=_this.data.comment,
          msg.publish_time=get_time();
          _this.comment_db(_this.data.id,msg);
          _this.db(_this.data.id);
          _this.onLoad(_this.data);
        }
      });
    } else {
      wx.showToast({
        title: '请先登陆',
        icon: 'success',
        duration: 4000,
        success: function (res) {
          wx.redirectTo({
            url: '../tree_register/tree_register',
          })
        }
      })

    }
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.db(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('用户下拉动作');
    this.db(this.data.id);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉触底事件');
    this.db(this.data.id);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


