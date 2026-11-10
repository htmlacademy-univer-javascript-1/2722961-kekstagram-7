import { NAMES, MESSAGES } from './data.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

// Константы вместо "волшебных значений"
const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const AVATARS_COUNT = 6;
const COMMENT_ID_MAX = 1000;

const createComment = () => ({
  id: getRandomInteger(1, COMMENT_ID_MAX),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => {
  const commentsCount = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  return comments;
};

const createPhotos = () => {
  const photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии №${i}`,
      likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
      comments: createComments()
    });
  }
  return photos;
};

export { createPhotos };
