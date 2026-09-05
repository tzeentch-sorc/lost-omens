import bridge from '@vkontakte/vk-bridge';
import * as logger from './Logger.js';

// Высота окна приложения в веб-версии VK: по контенту, но не больше экрана.

/** Ниже этого окно не ужимаем: спиннер или пустая панель не должны схлопывать приложение. */
const MIN_HEIGHT = 400;
/** Пересчёт откладывается: за одну перерисовку мутаций прилетает много. */
const UPDATE_DELAY = 150;
/** Сколько раз ждать конца перехода между панелями, прежде чем мерить как есть. */
const MAX_TRANSITION_WAITS = 5;
/** Шапка VK сверху и футер приложения снизу: в viewport_height они входят, в окно не помещаются. */
const RESERVE = 120;

let viewportHeight = 0;
let requestedHeight = 0;
let updateTimer = null;
let transitionWaits = 0;
let reserve = RESERVE;

/**
 * Высота контента активной панели: сама панель растянута на окно (min-height: 100%),
 * а её дети — нет, поэтому меряем по нижней границе самого нижнего ребёнка.
 * @returns {number} высота в пикселях, 0 — если панелей ещё нет
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
    // Ширину не меняем, но параметр обязательный. Именно innerWidth: clientWidth меньше
    // на полосу прокрутки, и окно от вызова к вызову сужалось бы.
    const applied = await bridge.send('VKWebAppResizeWindow', {
      width: window.innerWidth,
      height,
    });
    logger.log('Размер окна приложения:', applied);

    // VK урезал запрос сам — значит отдал ровно то, что помещается, и запас лишний.
    if (reserve > 0 && Number(applied?.height) < height) {
      reserve = 0;
      scheduleUpdate();
    }
  } catch (err) {
    // Вне веб-версии метода нет — это ожидаемо, а не поломка.
    logger.warn('VKWebAppResizeWindow недоступен:', err);
  }
}

function update() {
  if (!viewportHeight) return;

  // Во время перехода панелей в DOM их две: замер дал бы высоту той, что длиннее.
  if (document.querySelectorAll('.vkuiPanel__in').length > 1 && transitionWaits < MAX_TRANSITION_WAITS) {
    transitionWaits += 1;
    scheduleUpdate();
    return;
  }
  transitionWaits = 0;

  const available = Math.max(viewportHeight - reserve, MIN_HEIGHT);
  const content = measureContent();
  // Контента ещё нет (первый кадр, спиннер) — разворачиваем окно на весь экран.
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
 * Подгоняет высоту окна приложения под контент, но не выше экрана.
 * Вызывать до VKWebAppInit: первый VKWebAppUpdateConfig приходит в ответ на инициализацию.
 * На мобильных клиентах не работает — viewport_height есть только в конфиге веб-версий.
 */
export function fitAppHeight() {
  bridge.subscribe(({ detail }) => {
    if (detail?.type !== 'VKWebAppUpdateConfig') return;

    const height = detail.data?.viewport_height;
    if (typeof height !== 'number') return;

    viewportHeight = height;
    scheduleUpdate();
  });

  // Контент меняют переходы между панелями, приезд данных и раскрытие блоков — это ловят
  // мутации; догрузку картинок мутацией не назовёшь, поэтому ещё и load в фазе перехвата.
  new MutationObserver(scheduleUpdate).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  document.addEventListener('load', scheduleUpdate, true);
}
