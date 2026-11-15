import { NAMES, MESSAGES } from './data.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  return comments;
};

const createPhotos = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии №${i}`,
      likes: getRandomInteger(15, 200),
      comments: createComments()
    });
  }
  return photos;
};

export { createPhotos };
