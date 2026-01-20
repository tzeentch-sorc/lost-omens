const dev = process.env.NODE_ENV === 'development';

export const log = (...args) => {
  if (dev) {
    console.log(...args);
  }
};

export const warn = (...args) => {
  if (dev) {
    console.warn(...args);
  }
};

export const error = (...args) => {
  console.error(...args);
};