function a() {
    try{
        setTimeout( b, 1000);
    }catch(e){
        console.log('hjhjhj')
    }
  }

a()

function b(){
    console.log('hhhhh');
    throw(new Error("ffffffff"))
}