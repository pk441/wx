function assert(Rxp, msg, err) {
  if (!Rxp.test(msg) && msg.length > 0) {
    this.properties[err] = '';
  } else {
    this.properties[err] = 'none';
  }
  return this.properties[err];
};

function get_time() {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  month=month<10?'0'+month:month;
  let day = time.getDate();
  day=day<10?'0'+day:day;
  let hour = time.getHours();
  hour=hour<10?'0'+hour:hour;
  let minutes = time.getMinutes();
  minutes=minutes<10?'0'+minutes:minutes;
  return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分'
}

function compare (obj1, obj2) {
  var val1 = obj1.publish_time;
  var val2 = obj2.publish_time;
  if (val1 < val2) {
    return 1;
  } else if (val1 > val2) {
    return -1;
  } else {
    return 0;
  }
}


module.exports = {
  assert,
  get_time,
  compare
}