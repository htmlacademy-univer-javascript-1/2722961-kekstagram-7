const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { getRandomInteger, getRandomArrayElement };
