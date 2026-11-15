// Находим элементы модального окна
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel'); // или .big-picture__cancel, проверьте в html
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Переменные для порционной загрузки комментариев
let currentComments = []; // Массив всех комментариев текущей фотографии
let shownCommentsCount = 0; // Сколько сейчас показано на экране
const COMMENTS_PER_PAGE = 5; // Количество комментариев, добавляемых за один раз

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

// Функция обновления счетчика (например, "5 из 12 комментариев")
const updateCommentsCounter = () => {
  const total = currentComments.length;
  const shown = Math.min(shownCommentsCount, total);
  // Сохраняем класс .comments-count для числа, как это было в исходной разметке
  socialCommentCount.innerHTML = `${shown} из <span class="comments-count">${total}</span> комментариев`;
};

// Функция для отрисовки следующих 5 комментариев
const renderNextComments = () => {
  const fragment = document.createDocumentFragment();

  // Берем срез массива от текущего количества до текущего + 5
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_PAGE);

  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);

  // Обновляем счетчик "показано"
  shownCommentsCount += nextComments.length;
  updateCommentsCounter();

  // Если показали все комментарии, прячем кнопку "Загрузить еще"
  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
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
  // 1. Заполняем основные данные
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  // 2. Инициализируем комментарии (сбрасываем старые)
  currentComments = photo.comments;
  shownCommentsCount = 0;
  socialComments.innerHTML = ''; // Очищаем старое

  // 3. Показываем счетчик и кнопку (убираем класс hidden)
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // 4. Отрисовываем первую порцию комментариев
  renderNextComments();

  // 5. Показываем окно и отключаем скролл страницы
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // 6. Вешаем обработчики закрытия
  // Обработчик клика по крестику (используем once: true, чтобы не плодить обработчики)
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

// Вешаем обработчик на кнопку "Загрузить еще" один раз при загрузке скрипта
commentsLoader.addEventListener('click', renderNextComments);

export { openBigPicture };
