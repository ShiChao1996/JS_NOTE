/**
 * Created by lovae on 2017/9/13.
 */

//题目要求：点击按钮，隔一秒添加一个li，一共十个，内容为 0~9

let btn = document.getElementsByClassName('button')[0];
let container = document.getElementById('root');

let create = (function () {
    let i = 0;
    return function () {
        let oLi = document.createElement('li');
        oLi.innerHTML = i%10;
        container.appendChild(oLi);
        i++;
        return i;
    }
})()

btn.addEventListener('click', function () {
    let li;
    let timer = setInterval(() => {
        li = create();
        if(li%10 === 0){
            clearInterval(timer)
        }
    }, 1000);

})