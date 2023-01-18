import { Subscriber } from "./subscriber.js";
import Observer from './observer.js';

class Logger {
  static log(data) {
    console.log(data)
  }
}

Observer.addSubscriber(new Subscriber(saveHandler));
Observer.addSubscriber(new Subscriber(discoverPowerBallNumber));

setTimeout(()=>{
  Observer.removeObserver(saveHandler)
}
, 5000);

function interval() {
  let timer = 1

  setInterval(
    () => {
      Observer.notify(timer)
      // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
      // saveCToSessionStorage(timer)
      // discoverPowerBallNumber(timer)
      timer++
    }
    , 2000);
}

function saveHandler(data){
  let output = saveCToSessionStorage(data);
  Logger.log(`[Log from C] ${output}`);
}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(data)
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log('[powerball number]', data);
}

interval();
