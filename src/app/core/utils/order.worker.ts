onmessage = (e) => {
  let progress = 0;
  let intervalId: any;
  const { deliveryTime } = e.data;

  const totalTimeInMilliseconds = deliveryTime * 60 * 1000;
  const totalIntervals = totalTimeInMilliseconds / 1000; // Total intervals (1 per second)
  const increment = 100 / totalIntervals; // Progress increment per second

  intervalId = setInterval(() => {
    progress += increment;

    postMessage({ progress: progress >= 100 ? 100 : progress });

    if (progress >= 100) {
      progress = 100;
      clearInterval(intervalId);
    }
  }, 1000);
};
