// Находим элементы формы
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

// Настройка Pristine
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Валидация
const getHashtagsArray = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.every((tag) => regex.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  return getHashtagsArray(value).length <= 5;
};

const validateHashtagUniqueness = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  const uniqueTags = new Set(hashtags);
  return uniqueTags.size === hashtags.length;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtagFormat, 'Хэштег должен начинаться с #, содержать только буквы и цифры, быть до 20 символов.');
pristine.addValidator(hashtagsInput, validateHashtagCount, 'Нельзя указать больше пяти хэштегов.');
pristine.addValidator(hashtagsInput, validateHashtagUniqueness, 'Хэштеги не должны повторяться.');
pristine.addValidator(descriptionInput, validateDescription, 'Комментарий не может быть длиннее 140 символов.');

function closeForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

function openForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeForm, { once: true });
  document.addEventListener('keydown', onEscKeyDown);
}

// Слушатели событий
uploadFile.addEventListener('change', () => {
  openForm();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

// Отправка формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    uploadForm.submit();
  }
});

export { openForm };
