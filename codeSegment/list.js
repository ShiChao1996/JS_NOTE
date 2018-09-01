document.addEventListener("click", function (e) {
  console.log(e)
  console.log(e.srcElement.parentNode)
  console.log(e.srcElement.parentNode.parentNode.id)
  let res = "";

  let getClassOrId = function (ele) {
    console.log(ele.id)
    let resStr = "";
    if (ele.id !== "") {
      let temp = "#" + ele.id.toString();
      resStr += temp;
    }

    if (ele.className !== "") {
      resStr += " ";
      let classArr = ele.className.split(" ");
      classArr.forEach(c => {
        let temp = "." + c;
        resStr += temp;
      })
    }
    return resStr;
  }

  let r = function (tar) {
    if (document.body === tar) {
      res = res + " " + getClassOrId(tar);
      res = res + "html";
      console.log(res)
      return;
    }

    res = res + getClassOrId(tar)
    r(tar.parentNode)
  }


  r(e.srcElement, res)
  console.log(res)

})
