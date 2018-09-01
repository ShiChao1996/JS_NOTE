(function () {
  var obj = [{
    keys: "m.baidu.com",
    name: "baidu",
    url: "https://m.baidu.com/",
    arr: ["1015678d", "1015678d", "1015678d"]
  }, {
    keys: "sm.cn",
    name: "sm",
    url: "https://yz.m.sm.cn/",
    arr: ["wm816176"]
  }, {
    keys: "m.sogou.com",
    name: "sogou",
    url: "https://wap.sogou.com/",
    arr: ["sogou-mobb-717e15ebeb12bbe8"]
  }]
  refer(function (data) {
    var title = "";
    var sj = Math.round(Math.random() * (data.arr.length-1))
    if (data == null) {
      return false;
    }
    var referrer =  data.referrer;
    if (data.name == "baidu") {
      var key = getQueryStringRegExp(referrer)
      if (document.getElementsByTagName("title")[0].innerHTML.length > 0) {
        if(key){
          title = "from=" + data.arr[sj] + "/s?word=" + decodeURI(key)
        }else{
          title = "from=" + data.arr[sj] + "/s?word=" + document.getElementsByTagName("title")[0].innerHTML
        }
      } else {
        title = "?from=" + data.arr[sj]
      }
    } else if (data.name == "sm") {
      var key = getQueryStringRegExp("q",referrer)
      if (key) {
        title = "s?q=" + decodeURI(key) + "&from=" + data.arr[sj]
      } else {
        title = "?from=" + data.arr[sj]
      }
    } else if (data.name == "sogou") {
      var key = getQueryStringRegExp("keyword",referrer)
      if (key) {
        title = "web/sl?keyword=" + decodeURI(key) + "&bid=" + data.arr[sj]
      } else {
        title = "?bid=" + data.arr[sj]
      }
    }
    pushHistory();
    window.addEventListener("popstate", function (e) {
      window.location.href = data.url + title
    }, false)
  });
  function getQueryStringRegExp(name,src){
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(src)){
      return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
    }else{
      return false;
    }
  };
  function pushHistory() {
    var state = {
      title: "title",
      url: "#"
    };
    window.history.pushState(state, "title", "#")
  }

  function refer(callback) {
    var referrer = document.referrer;
    for (var i = 0; i < obj.length; i++) {
      if (referrer.indexOf(obj[i].keys) > 0) {
        obj[i].referrer = referrer;
        callback(obj[i])
        return true
      }
    }
    callback(null);
  }
})();

/**
 * Created by see on 8/19/17.
 */
