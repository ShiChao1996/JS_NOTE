

let Rx = require('rxjs/Rx');


// let stream$ = Observable.of(1,2,3).map(x => x + '!!!');
//
// stream$.subscribe((val) => {
//     console.log(val) // 1!!! 2!!! 3!!!
// })


/*import Rx  from 'rxjs/Observable';
import 'rxjs/add/observable/of' ;
import 'rxjs/add/operator/map';*/

/*const docElm = document.documentElement;
const cardElm = document.querySelector('#card');
const titleElm = document.querySelector('#title');

const { clientWidth, clientHeight } = docElm;

const mouseMove$ = Rx.Observable
    .fromEvent(docElm, 'mousemove')
    .map(event => ({ x: event.clientX, y: event.clientY }))

mouseMove$.subscribe(pos => {
    const rotX = (pos.y / clientHeight * -50) - 25;
    const rotY = (pos.x / clientWidth * 50) - 25;

    cardElm.style = `
    transform: rotateX(${rotX}deg) rotateY(${rotY}deg);
  `;
});*/


let stream$ = Rx.Observable.of(1,2,4,5)

stream$.subscribe((e) => {
    console.log(e)
})