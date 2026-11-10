import { createPhotos } from './generate.js';
import { renderPictures } from './render.js';

const photos = createPhotos();
renderPictures(photos);
