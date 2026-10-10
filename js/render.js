// Находим контейнер, куда будем вставлять фотографии
const picturesContainer = document.querySelector('.pictures');

// Находим шаблон одной миниатюры
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция для создания одного DOM-элемента (миниатюры)
const createPictureElement = (photo) => {
  // Клонируем содержимое шаблона (true = глубокое клонирование)
  const pictureElement = pictureTemplate.cloneNode(true);

  // Находим элементы внутри шаблона
  const image = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');

  // Заполняем данные согласно заданию
  image.src = photo.url;
  image.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  return pictureElement;
};

// Главная функция отрисовки галереи
const renderPictures = (photos) => {
  // Создаем фрагмент документа (для оптимизации вставки)
  const fragment = document.createDocumentFragment();

  // Проходимся по каждому объекту и создаем для него DOM-элемент
  photos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });

  // Вставляем все готовые элементы в контейнер на странице
  picturesContainer.appendChild(fragment);
};

export { renderPictures };
