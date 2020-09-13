function db(database) {
  let _this = this;
  const envname = 'pk4-ghl0d'
  //首先初始化数据库
  wx.cloud.init();
  //连接数据库同时按照发表时间进行排序
  const db = wx.cloud.database({
    env: envname
  }).collection(database).orderBy('publish_time', 'desc');
  //获取所有内容
  db.get({
    success(res) {
      console.log('获取数据成功', res);
      //目前数据库中的数据全部取出来了,
      _this.setData({
        message_array: res.data,
      })
    }
  })

}
//保存点赞的数量,点赞人的id
function connect_db(database, id, goods, goodsid, openid) {
  let _this = this;
  const envname = 'pk4-ghl0d'
  //首先初始化数据库
  wx.cloud.init();
  //连接数据库同时按照发表时间进行排序
  const db = wx.cloud.database({
    env: envname
  }).collection(database);
  goodsid.push(openid);
  console.log(goods, goodsid);
  db.doc(id).update({
    data: {
      goods: goods,
      goodsid: goodsid
    },
    success: function (res) {
      console.log('点赞数据已保存到数据库', res);
    },
    fail(e) {
      console.log(e);
    }
  })


}



Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ['../../images/swiper1.jpg', '../../images/swiper2.jpg', '../../images/swiper3.jpg'],
    message_array: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在页面初次加载前，我们通过数据库获取朋友圈内最新的言论信息，需要连接数据库
    let obj = null;
    let _this = this;
    db.call(_this, 'publish_content');
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
  plus(e) {
    //获取点击对象的index
    let zan, goodsid;
    let index = e.currentTarget.dataset.id;
    let newmessage = {};
    newmessage = this.data.message_array;
    let id = newmessage[index]._id;
    //一个人只能点一次赞，若重复点击，则按照+-顺序，可以利用缓存来区别是不是一个人
    console.log(newmessage)
    goodsid = newmessage[index].goodsid;
    let _this = this;
    //获取当前登陆的用户，将这个用户存入点赞序列
    wx.getStorage({
      key: '_openid',
      success: (res) => {
        console.log(goodsid.indexOf(res.data));
        //有点问题
        if (goodsid.indexOf(res.data) == -1) {
          console.log('没点过')
          newmessage[index].goods++;
          zan = newmessage[index].goods;
        } else {
          console.log('点过');
        }
        _this.setData({
          message_array: newmessage
        })
        connect_db('publish_content', id, zan, goodsid, res.data);
      }
    });

    this.setData({
      message_array: newmessage
    });
    //将变化的数据保存到数据库
  },
  to_treeDetail(ev){
    let index=ev.currentTarget.dataset.id;
    let newmessage = {};
    newmessage = this.data.message_array;
    let id = newmessage[index]._id;
    wx.navigateTo({
      url: '../tree_detail/detail?id='+id,
    })
  }
})