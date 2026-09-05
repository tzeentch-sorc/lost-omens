import bridge from '@vkontakte/vk-bridge';
import * as logger from './Logger.js';

// В веб-версии VK высоту окна приложения задаёт сам VK, и по умолчанию она заметно
// меньше окна браузера: контент обрывается на границе iframe и уезжает во внутренний
// скролл. Поменять высоту может только само приложение — методом VKWebAppResizeWindow.
//
// Нужное поведение: контент короче экрана — окно по контенту, длиннее — окно по экрану.
// Поэтому просим min(высота контента, доступная высота).
//
// Доступная высота — это не всё окно браузера: viewport_height включает и шапку VK
// сверху, и футер приложения снизу («GEEKMO App · Показать QR-код · Действия»).
// Запрошенную высоту VK отдаёт как есть, поэтому обвязку надо вычесть самим, иначе
// низ окна оказывается за краем экрана и до него приходится долистывать.
//
// VKWebAppUpdateConfig приходит в ответ на VKWebAppInit и потом при каждом изменении
// размеров окна. Поле viewport_height есть только в конфиге веб-версий (vk.ru и m.vk.ru)
// и означает innerHeight родительского окна. У мобильных клиентов его нет — там ничего
// и не делаем.

/** Ниже этого окно не ужимаем: спиннер или пустая панель не должны схлопывать приложение. */
const MIN_HEIGHT = 400;
/** Пересчёт откладывается: за одну перерисовку мутаций прилетает много. */
const UPDATE_DELAY = 150;
/** Сколько раз ждать конца перехода между панелями, прежде чем мерить как есть. */
const MAX_TRANSITION_WAITS = 5;
/**
 * Запас на обвязку VK вокруг окна приложения: шапка ~55px сверху плюс футер ~65px снизу.
 * Измерить её из приложения нечем — viewport_height приходит без разбивки, а высота
 * страницы, которой отвечает VKWebAppScroll, переполнения не показывает.
 */
const RESERVE = 120;

let viewportHeight = 0;
let requestedHeight = 0;
let updateTimer = null;
let transitionWaits = 0;
let reserve = RESERVE;

/**
 * Высота собственно контента.
 * Панель VKUI тянется на всю высоту окна (min-height: 100%), а её дети — нет, поэтому
 * конец контента — нижняя граница самого нижнего ребёнка. Отсюда же завязка на разметку
 * VKUI: измерять больше нечего, документ высоту контента не отражает — панели
 * спозиционированы абсолютно, и body всегда нулевой высоты.
 * @returns {number} высота контента в пикселях, 0 — если панелей ещё нет
 */
function measureContent() {
  let bottom = 0;

  document.querySelectorAll('.vkuiPanel__in').forEach((panel) => {
    for (const child of panel.children) {
      const rect = child.getBoundingClientRect();
      if (rect.height > 0) {
        bottom = Math.max(bottom, rect.bottom + window.scrollY);
      }
    }
  });

  return Math.ceil(bottom);
}

async function applyHeight(height) {
  if (height === requestedHeight) return;
  requestedHeight = height;

  try {
    // Ширину передаём текущую: менять её не нужно, а параметр обязательный. Именно
    // innerWidth, а не clientWidth: второй меньше на полосу прокрутки, и окно от вызова
    // к вызову сужалось бы. В ответе приезжают размеры, которые VK применил на самом деле.
    const applied = await bridge.send('VKWebAppResizeWindow', {
      width: window.innerWidth,
      height,
    });
    logger.log('Размер окна приложения:', applied);

    // Если VK урезал запрос сам, он отдал ровно то, что помещается, — и запас,
    // который мы вычли, оказался лишним.
    if (reserve > 0 && Number(applied?.height) < height) {
      reserve = 0;
      scheduleUpdate();
    }
  } catch (err) {
    // Вне веб-версии метод не поддерживается — это ожидаемо, а не поломка.
    logger.warn('VKWebAppResizeWindow недоступен:', err);
  }
}

function update() {
  if (!viewportHeight) return;

  // Во время перехода между панелями в DOM их две: старую VKUI удаляет только по
  // окончании анимации. Замер в этот момент дал бы высоту той из них, которая длиннее,
  // поэтому пересчёт откладывается. Ограничение на число попыток — на случай, когда
  // панелей остаётся несколько надолго: тогда лучше окно с запасом, чем обрезанный
  // контент.
  if (document.querySelectorAll('.vkuiPanel__in').length > 1 && transitionWaits < MAX_TRANSITION_WAITS) {
    transitionWaits += 1;
    scheduleUpdate();
    return;
  }
  transitionWaits = 0;

  const available = Math.max(viewportHeight - reserve, MIN_HEIGHT);
  const content = measureContent();
  // Пока контента нет (первый кадр, спиннер), разворачиваем окно на весь экран:
  // так приложение не схлопывается до минимума, чтобы потом вырасти.
  const height = content > 0
    ? Math.min(Math.max(content, MIN_HEIGHT), available)
    : available;

  applyHeight(height);
}

function scheduleUpdate() {
  clearTimeout(updateTimer);
  updateTimer = setTimeout(update, UPDATE_DELAY);
}

/**
 * Подгоняет высоту окна приложения под контент, но не выше окна браузера.
 * Вызывать до VKWebAppInit — первый VKWebAppUpdateConfig приходит в ответ на инициализацию.
 */
export function fitAppHeight() {
  bridge.subscribe(({ detail }) => {
    if (detail?.type !== 'VKWebAppUpdateConfig') return;

    const height = detail.data?.viewport_height;
    if (typeof height !== 'number') return;

    viewportHeight = height;
    scheduleUpdate();
  });

  // Высота контента меняется от перехода между панелями, загрузки данных из таблиц и
  // раскрытия блоков. Мутации ловят это, а load в фазе перехвата — догрузку картинок,
  // которая мутацией не является.
  new MutationObserver(scheduleUpdate).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  document.addEventListener('load', scheduleUpdate, true);
}
