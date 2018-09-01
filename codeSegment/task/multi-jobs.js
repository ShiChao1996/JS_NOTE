function Job(id, time) {
  this.id = id;
  this.time = time;
}

let getRandomJob = function() {
  let autoId = 0;
  return function () {
    let t = Math.floor(Math.random() * 10) + 1;

    return new Job(autoId++, t)
  }
}();

function getJobs(number) {
  let res = [];
  for(let i = 0; i < number; i++){
    res.push(getRandomJob())
  }
  return res;
}


//machine
function Machine() {
  this.workTime = 0;
  this.jobs = []
}
Machine.prototype.work = function (job) {
  this.workTime += job.time;
  this.jobs.push(job.id);
};

function getMachines(number) {
  let res = [];
  for(let i = 0; i < number; i++){
    res.push(new Machine());
  }
  return res;
}
//workline

function multi_job(machineArr, jobArr) {
  let machineLen = machineArr.length, jobLen = jobArr.length;
  if(machineLen > jobLen){
    let maxTime = jobArr[0].time;
    for(let i = 0; i < jobLen; i++){
      machineArr[i].work(jobArr[i]);
      if(jobArr[i].time > max){
        max = jobArr[i].time;
      }
    }
    console.log("min time: ", max);
    return;
  }

  //
  let sortedJob = jobArr.sort((a, b) => {
    return b.time - a.time;
  });
  for(let i = 0; i < machineLen; i++){
    machineArr[i].work(jobArr[i]);
  }
  for(let i = machineLen; i < jobLen; i++){
    let minPos = 0;
    for(let j = 0; j < machineLen; j++){
      if(machineArr[j].workTime < machineArr[minPos].workTime){
        minPos = j;
      }
    }
    machineArr[minPos].work(jobArr[i]);
  }

  for(let i = 0; i < machineLen; i++){
    console.log('machine_' + i + 'handles jobs: ', machineArr[i].jobs)
  }
}


let jobs = getJobs(13);
let machines = getMachines(5);
console.log('jobs: ', jobs);
multi_job(machines, jobs);