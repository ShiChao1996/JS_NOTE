/**哈哈哈哈
 * Created by lovae on 2017/9/9.
 */

function bigNumMultiply(a, b){
    let factor1 = String(a).split('').map(_ => Number(_));
    let factor2 = String(b).split('').map(_ => Number(_));
    let len1 = factor1.length;
    let len2 = factor2.length;
    let resLen = factor1.length + factor2.length;
    let resArr = [...new Array(resLen)].map(_ => 0);

    let index1 = 0, index2 = 0, resIndex = 0, segRes = 0, tempRes = 0, carry = 0;
    for(let i = len1; i > 0; i--){
        index1 = len1 - i;
        for(let j = len2; j > 0; j--){
            index2 = len2 - j;
            resIndex = index1 + index2 + 1;      // +1: 防止 arr[0] 进位异常
            segRes = factor1[index1] * factor2[index2];
            partAdd(resArr, resIndex, segRes);
        }
    }

    return resArr.join('');
}

function partAdd(arr, index, value) {
    arr[index] += value;
    if(arr[index] > 9){
        let temp = arr[index].toString().split('').map(_ => Number(_));
        arr[index] = temp[1];
        partAdd(arr, index - 1, temp[0]);
    }
}

console.log(bigNumMultiply('2324132423424231423147897896987890987654432423423', '839790740987908789070987870987678'))
