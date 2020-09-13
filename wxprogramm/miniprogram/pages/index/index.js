// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },
  click:function(e){
    wx.clearStorage({
      complete: (res) => {
        console.log('缓存清理完毕')
      },
    })
    wx.switchTab({
      url: '../../pages/tree_hole/tree_hole',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init();
    wx.cloud.downloadFile({
      fileID: 'cloud://pk4-ghl0d.706b-pk4-ghl0d-1302863353/heart/启动背景图片.jpg',
      success: res => {
        console.log(res.tempFilePath);
        this.setData({
          url:res.tempFilePath
        })
      },
      fail: err => {
        // handle error
      }
    })

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

  }
})