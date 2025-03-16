const resolveAfterDelay = <T>(value: T, delay: number): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });

export default resolveAfterDelay;
