// miniprogram/pages/tree_login/tree_login.js
//直接将表单的数据和数据库进行校验,实现最基础的功能
//登陆页面和注册页面都缺少微信授权登陆功能。
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
  tree_login(e) {
    console.log(e, '组件传到了父组件');
    wx.showToast({
      title: '登陆成功',
      success() {
        console.log('登陆成功,下一步计划将登陆状态保存在缓存中');
      }
    });

    //注意wx路由的几种方法，wx.navigateTo为保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
    wx.switchTab({
      url: '../../pages/tree_branch/tree_branch',
    });
  },
  tree_register() {
    console.log('我收到了来自组件的点击事件，准备完成跳转至注册页面');
    wx.navigateTo({
      url: '../../pages/tree_register/tree_register',
    })
  }
})