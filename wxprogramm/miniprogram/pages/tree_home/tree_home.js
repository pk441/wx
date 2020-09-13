// miniprogram/pages/tree_home/tree_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  home_share() {
    console.log('准备分享');
    wx.getStorage({
      key: '_openid',
      success(e) {
        wx.showModal({
          title: '分享一下吧'
        })
      },
      fail(err) {
        wx.navigateTo({
          url: '../../pages/tree_login/tree_login',
        })
      }
    })

  },
  //用户注册
  home_register() {
    wx.navigateTo({
      url: '../../pages/tree_register/tree_register',
    })
  }

})