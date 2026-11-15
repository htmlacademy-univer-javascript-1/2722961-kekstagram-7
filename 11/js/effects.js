// 1. РЕДАКТИРОВАНИЕ МАСШТАБА
const scaleInput = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

// Функция применения масштаба
const applyScale = (value) => {
  scaleInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

// Уменьшение
scaleSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    applyScale(currentScale);
  }
});

// Увеличение
scaleBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    applyScale(currentScale);
  }
});

// Сброс масштаба
const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  applyScale(currentScale);
};

// 2. НАЛОЖЕНИЕ ЭФФЕКТОВ (noUiSlider)
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

// Настройки эффектов (мин/макс, шаг, единицы измерения, CSS-свойство)
const EFFECTS = {
  none: { min: 0, max: 100, step: 1, unit: '', filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: 'brightness' }
};

// Инициализация слайдера
noUiSlider.create(document.querySelector('.effect-level__slider'), {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

const slider = document.querySelector('.effect-level__slider');
let currentEffect = 'none';

// Функция обновления фильтра на картинке
const updateFilter = (value) => {
  const effect = EFFECTS[currentEffect];
  effectLevelValue.value = value; // Записываем в скрытое поле формы

  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
  } else {
    imagePreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
};

// Обработчик движения ползунка
slider.noUiSlider.on('update', (values, handle) => {
  updateFilter(values[handle]);
});

// Обработчик переключения радиокнопок
effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    const effect = EFFECTS[currentEffect];

    if (currentEffect === 'none') {
      effectLevel.classList.add('hidden'); // Скрываем слайдер для "Оригинала"
      imagePreview.style.filter = 'none';
      effectLevelValue.value = ''; // Очищаем значение
    } else {
      effectLevel.classList.remove('hidden'); // Показываем слайдер

      // Обновляем настройки слайдера под выбранный эффект
      slider.noUiSlider.updateOptions({
        range: { min: effect.min, max: effect.max },
        start: effect.max, // Сброс на максимум при переключении
        step: effect.step
      });

      // Принудительно применяем фильтр (так как слайдер встал на максимум)
      updateFilter(effect.max);
    }
  }
});

// Сброс эффектов
const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  currentEffect = 'none';
  effectLevel.classList.add('hidden');
  imagePreview.style.filter = 'none';
  effectLevelValue.value = '';
};

export { resetScale, resetEffects };
