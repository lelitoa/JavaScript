// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// await measurePerformance('add 1', () => addData1(data), data)
// await measurePerformance('add 2', () => addData2(data), data)
// await measurePerformance('add 3', () => addData3(data), data)

// // for z await
// async function addData1(data) {
//   let sum = 0
//   for (let item of data) {
//     sum = await asyncAdd(sum, item)
//   }
//   return sum
// }
// // reduce z sum jako Promise
// async function addData2(data) {
//   console.log('reduce start')
//   const resultPromise = data.reduce(async (sumPromise, item) => {
//     const sumValue = await sumPromise
//     return asyncAdd(sumValue, item)
//   }, 0)
//   console.log('reduce end')
//   return resultPromise
// }
// // równoległe operacje
// async function addData3(values) {
//   let data = [...values]

//   while (data.length > 1) {
//     let asyncTempSums = []
//     while (data.length > 0) {
//       if (data.length === 1) {
//         asyncTempSums.push(Promise.resolve(data.pop()))
//       } else {
//         const a = data.pop()
//         const b = data.pop()
//         asyncTempSums.push(asyncAdd(a, b))
//       }
//     }
//     data = await Promise.all(asyncTempSums)
//   }
//   return data.pop()
// }
// async function measurePerformance(name, cb) {
//   console.log(`Start: ${name}`);
//   performance.mark('mf-start')
//   const result = await cb()
//   performance.mark('mf-end')
//   const runTime = performance.measure('Czas wykonania kodu', 'mf-start', 'mf-end')
//   console.log(`Wynik z ${name}: ${result}`)
//   console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`)
// }
// async function asyncAdd(a, b) {
//   console.count('[async add operation]')
//   if (typeof a !== 'number' || typeof b !== 'number') {
//     console.log('err', { a, b })
//     return Promise.reject('Argumenty muszą mieć typ number!')
//   }
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b)
//     }, 10)
//   })
// }

const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}

class PerfMon {
  static measure = async (callback, ...args) => {
      performance.mark("start");
      await callback(args);
      performance.mark("end");

      let timeElapsed = performance.measure(
          "result",
          "start",
          "end"
      ).duration;
      console.log(`Time elapsed in ms: ${timeElapsed}`);

      return timeElapsed;
  };
}

const sumOfArgs = async (nums) => {
  let arr = [];

  if (nums.length == 1) {
      console.log(nums[0]);
      return nums[0];
  }

  if (nums.length % 2 != 0 && nums.length != 1) {
      const test = nums.splice(nums.length - 1, 1);
      arr.push(...test);
  }

  let state = [];

  for (let i = 0; i <= nums.length - 2; i = i + 2) {
      state.push(           
          await asyncAdd(nums[i], nums[i + 1])
      );
  }

  await  Promise.all(state).then(async (data) => {
      arr.unshift(...data);                      
      return await sumOfArgs(arr);
  });
};

let testArr = [];
let quantity = 10;

for (let i = 1; i <= quantity; i++) {
    testArr.push(i);
}

performance.mark("start");
let test = await sumOfArgs(testArr);
performance.mark("end");

let timeElapsed = performance.measure("result", "start", "end").duration;

console.log("Time elapsed: "+timeElapsed);
console.log("Sum of the arr: "+test)



// const t0 = performance.now();

// const asyncAdd = async (a,b) => {
//     if (typeof a !== 'number' || typeof b !== 'number') {
//       return Promise.reject('Argumenty muszą mieć typ number!')
//     }
//     return new Promise((resolve, reject) => {
//       setTimeout(() =>{
//         resolve(a+b)
//       }, 100)
//     })
// }

// const t1 = performance.now();
// console.log(`Program took ${t1 - t0} milliseconds.`);
