function myFirstPromise(shouldFail) {
    return new Promise((resolve, reject) => {
      if (shouldFail) {
        reject('Fail');
      } else {
        resolve('Success');
      }
    });
  }
  