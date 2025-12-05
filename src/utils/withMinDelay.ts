export function withMinDelay<T>(promise: Promise<T>, ms: number) {
  return Promise.all([promise, new Promise((r) => setTimeout(r, ms))]).then(
    ([result]) => result,
  );
}
