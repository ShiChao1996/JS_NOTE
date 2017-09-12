/**
 * Created by lovae on 2017/9/12.
 */

let src = {
    a: 'aaa',
    b: 123,
    c: function () {
        //...
    }
}




// 浅拷贝1

function copyObj_1(src) {
    let target = Object.create({});
    for(let attr in src){
        if(src.hasOwnProperty(attr)){
            target[attr] = src[attr];
        }
    }

    return target;
}

//浅拷贝2
function copyObj_2(src) {
    return Object.assign(src);
}

let tar = copyObj_2(src)
console.log(tar)