export function runMiddlewares(middlewares, to, from, next) {
  const stack = [...middlewares];

  const runNext = () => {
    if (stack.length === 0) {
      next();
      return;
    }

    const middleware = stack.shift();
    middleware(to, from, runNext);
  };

  runNext();
}
