// Находим элементы модального окна
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel'); // или .cancel, посмотрите в html

// Элементы, которые нужно спрятать по заданию
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Функция для создания одного комментария (по шаблону из задания)
const createCommentElement = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = `Аватар пользователя ${comment.name}`;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(p);

  return li;
};

// Функция закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Очищаем список комментариев при закрытии, чтобы при следующем открытии не было дублей
  socialComments.innerHTML = '';
};

// Функция открытия окна с данными
const openBigPicture = (photo) => {
  // 1. Заполняем данные
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // 2. Отрисовываем комментарии
  socialComments.innerHTML = ''; // Очищаем старое
  const fragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(fragment);

  // 3. Прячем счетчик и лоадер (задание пункт 4)
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // 4. Показываем окно и отключаем скролл страницы (пункт 3 и 5)
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // 5. Вешаем обработчики закрытия (пункт 6)
  // Обработчик клика по крестику
  closeButton.addEventListener('click', closeBigPicture, { once: true });

  // Обработчик нажатия Esc
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  document.addEventListener('keydown', onEscKeyDown);
};

export { openBigPicture };
