self.addEventListener('message', (event: MessageEvent) => {
  const duration = event.data; // ms
  let timeLeft = duration;

  const interval = setInterval(() => {
    timeLeft -= 1000; // Decrease by 1 second

    if (timeLeft === -1000) {
      clearInterval(interval);
      self.postMessage({ type: 'finished' });
    } else {
      self.postMessage({ type: 'tick', timeLeft });
    }
  }, 1000);
});
