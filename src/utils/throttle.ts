function throttle(func: any, ms: number) {
  let isThrottled: boolean = false;
  let savedArgs: any;
  let savedThis: any;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = null;
      return;
    }

    func.apply(null, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
export default throttle;
