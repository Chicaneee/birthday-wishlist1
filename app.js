const STORAGE_KEY = "birthdayWishlistCollectedV4";
const LEGACY_STORAGE_KEYS = ["birthdayWishlistCollected", "birthdayWishlistCollectedV2", "birthdayWishlistCollectedV3"];
const RESERVATION_STORAGE_KEY = "wishlistReservationsV2";
const LEGACY_RESERVATION_STORAGE_KEYS = ["wishlistReservations"];
const CLIENT_TOKEN_STORAGE_KEY = "wishlistClientTokenV1";
const GIFT_COUNTER_SELECTIONS_KEY = "wishlistGiftCounterSelectionsV1";
const GIFT_COUNTER_CACHE_KEY = "wishlistGiftCounterCacheV1";
const RESERVATION_REFRESH_MS = 4000;
const RESERVATION_API_URL =
  "https://script.google.com/macros/s/AKfycby47Ypd1zEM2VjmQYGtLBh-4WzmwOGyAIiC-7RdYYAjZqqbcakVxnS_OMQgem7dON-krg/exec";
const RESERVATION_API_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];

const profile = {
  name: "Стар",
  mainTargetId: "money-gift",
};

const targets = [
  {
    id: "money-gift",
    title: "Денежный подарок",
    shortTitle: "Деньги в копилку",
    tag: "любая сумма",
    price: 0,
    priceLabel: "любая сумма",
    collected: 0,
    currency: "UAH",
    image: "assets/money-gift.png?v=20260824",
    description: "Самый актуальный вариант сейчас: можно отправить любую комфортную сумму в копилку.",
    fundTitle: "Денежная копилка",
    fundDescription: "Если не хочется выбирать конкретную вещь, можно просто отправить любую комфортную сумму. Сейчас это самый полезный и спокойный вариант.",
    quickAmounts: [100, 300, 500],
    monoJarUrl: "https://send.monobank.ua/jar/9pQWkwUwpQ",
    reservable: false,
  },
  {
    id: "handmade-gift",
    title: "Что-то своими руками",
    tag: "своими руками",
    price: 0,
    priceLabel: "без цены",
    collected: 0,
    currency: "UAH",
    image: "assets/handmade-gift.jpg?v=20260824",
    description: "Открытка, браслет, рисунок, маленькая поделка или что-то с душой.",
    quickAmounts: [100, 300, 500],
    reservable: false,
    giftCounter: true,
  },
  {
    id: "big-plush",
    title: "Большая игрушка Stitch",
    tag: "мягкая игрушка",
    price: 0,
    priceLabel: "любая",
    collected: 0,
    currency: "UAH",
    image: "assets/stitch-plush-photo.jpg?v=20260824",
    description: "Большая мягкая игрушка Stitch, любая. Главное, чтобы она была большая и мягкая.",
    quickAmounts: [300, 500, 1000],
    reservable: true,
  },
  {
    id: "cat-photo-pillow",
    title: "Подушка с фото Белки",
    tag: "уютная штука",
    price: 519,
    priceLabel: "от 519 грн",
    collected: 0,
    currency: "UAH",
    image: "assets/cat-pillow.jpg?v=20260824",
    description: "Подушка с фото Белки, моей кошки. Если захочется заказать именно её, можно написать мне, и я скину фото Белки для печати.",
    quickAmounts: [200, 500, 700],
    link: "https://impillowqueen.com.ua/product/indyvidualna-podushka-z-vashym-puhnastykom/?attribute_pa_size=malenka-35-sm",
    reservable: true,
  },
  {
    id: "night-light",
    title: "Деревянный LED-ночник",
    tag: "для комнаты",
    price: 1690,
    collected: 0,
    currency: "UAH",
    image: "assets/night-light.jpg?v=20260824",
    description: "Уютный деревянный ночник с мягким светом.",
    quickAmounts: [300, 700, 1000],
    link: "https://woodone.if.ua/ua/p3130086468-derevyannyj-led-nochnik.html",
    reservable: true,
  },
  {
    id: "soap-dispenser",
    title: "Автоматический дозатор мыла",
    tag: "смешная штука",
    price: 1500,
    collected: 0,
    currency: "UAH",
    image: "assets/soap-dispenser.jpg?v=20260824",
    description: "Подносишь руки, и он сам выдаёт пену.",
    quickAmounts: [300, 500, 1000],
    link: "https://prom.ua/p2889325155-dozator-sensornyj-dlya.html",
    reservable: true,
  },
  {
    id: "horse-treats",
    title: "Вкусняшки для лошадей",
    tag: "для конюшни",
    price: 222,
    collected: 0,
    currency: "UAH",
    image: "assets/horse-treats-likit.jpg?v=20260824",
    description: "Прикольные лакомства для лошадей, которые можно взять на конюшню и угостить после тренировки.",
    quickAmounts: [100, 200, 300],
    link: "https://la-shop.com.ua/ua/plitka-konfetka-ot-likit-17246",
    reservable: false,
    giftCounter: true,
  },
  {
    id: "fried-ice-cream-maker",
    title: "Аппарат для жареного мороженого",
    tag: "для вкусных экспериментов",
    price: 0,
    priceLabel: "цена по ссылке",
    collected: 0,
    currency: "UAH",
    image: "assets/fried-ice-cream-photo.jpg?v=20260824",
    description: "Штука, чтобы дома делать мороженое на холодной поверхности: смешивать добавки и скручивать красивые роллы.",
    quickAmounts: [500, 1000, 1500],
    link: "https://stall.ua/ru/product/19840/",
    reservable: true,
  },
];

const cardTargetIds = [
  "money-gift",
  "handmade-gift",
  "big-plush",
  "cat-photo-pillow",
  "night-light",
  "soap-dispenser",
  "horse-treats",
  "fried-ice-cream-maker",
];
const choiceTargetIds = ["money-gift"];
const money = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 2,
});

const wishlistGrid = document.querySelector("#wishlistGrid");
const wishTemplate = document.querySelector("#wishTemplate");
const giftForm = document.querySelector("#giftForm");
const giftAmount = document.querySelector("#giftAmount");
const amountCurrency = document.querySelector(".amount-row span");
const fundTitle = document.querySelector("#fund-title");
const fundDescription = document.querySelector("#fundDescription");
const targetChoices = document.querySelector("#targetChoices");
const selectedTargetName = document.querySelector("#selectedTargetName");
const toast = document.querySelector("#toast");

let selectedTargetId = profile.mainTargetId;
let reservations = {};
let reservationOwnership = {};
let giftCounts = {};
let giftCounterSelections = loadGiftCounterSelections();
const clientToken = getClientToken();
let reservationsApiAvailable = canUseReservationApi();
let sharedStateWriteInFlight = false;

function formatMoney(value, currency = "UAH") {
  if (currency === "USD") {
    return `$${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value)}`;
  }

  return `${money.format(value)} грн`;
}

function formatPeopleCount(value) {
  const count = Math.max(Number(value) || 0, 0);
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return "человек";
  if (last === 1) return "человек";
  if (last >= 2 && last <= 4) return "человека";
  return "человек";
}

function getTarget(id) {
  return targets.find((target) => target.id === id);
}

function getClientToken() {
  const saved = localStorage.getItem(CLIENT_TOKEN_STORAGE_KEY);
  if (/^[0-9A-Za-z_-]{8,80}$/.test(saved || "")) return saved;

  const token = typeof globalThis.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID().replace(/-/g, "")
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;

  localStorage.setItem(CLIENT_TOKEN_STORAGE_KEY, token);
  return token;
}

function loadGiftCounterSelections() {
  try {
    const saved = JSON.parse(localStorage.getItem(GIFT_COUNTER_SELECTIONS_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch (error) {
    localStorage.removeItem(GIFT_COUNTER_SELECTIONS_KEY);
    return new Set();
  }
}

function saveGiftCounterSelections() {
  localStorage.setItem(GIFT_COUNTER_SELECTIONS_KEY, JSON.stringify(Array.from(giftCounterSelections)));
}

function getSelectedTarget() {
  return getTarget(selectedTargetId) || getTarget(profile.mainTargetId);
}

function getPercent(collected, total) {
  if (!total) return 0;
  return Math.max(Math.min(Math.round((collected / total) * 100), 100), 0);
}

function setProgress(fillElement, collected, total) {
  fillElement.style.width = `${getPercent(collected, total)}%`;
}

function loadCollectedState() {
  try {
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    targets.forEach((target) => {
      if (typeof saved[target.id] === "number") {
        target.collected = Math.min(Math.max(saved[target.id], 0), target.price);
      }
    });
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveCollectedState() {
  const saved = Object.fromEntries(targets.map((target) => [target.id, target.collected]));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function renderHeroProgress() {
  const mainTarget = getTarget(profile.mainTargetId);
  const text = document.querySelector("#heroProgressText");
  const bar = document.querySelector("#heroProgressBar");

  if (mainTarget.price > 0) {
    text.textContent = `${formatMoney(mainTarget.collected, mainTarget.currency)} из ${formatMoney(
      mainTarget.price,
      mainTarget.currency,
    )}`;
    setProgress(bar, mainTarget.collected, mainTarget.price);
    return;
  }

  text.textContent = "любая сумма";
  setProgress(bar, 0, 1);
}

function renderTargetChoices() {
  targetChoices.replaceChildren();

  choiceTargetIds.forEach((targetId) => {
    const target = getTarget(targetId);
    const button = document.createElement("button");

    button.type = "button";
    button.dataset.target = target.id;
    button.textContent = target.shortTitle || target.title;
    button.addEventListener("click", () => {
      selectTarget(target.id, { amount: getSuggestedAmount(target) });
    });

    targetChoices.append(button);
  });
}

function renderWishes() {
  wishlistGrid.replaceChildren();

  cardTargetIds.forEach((targetId) => {
    const wish = getTarget(targetId);
    const card = wishTemplate.content.firstElementChild.cloneNode(true);
    const hasFixedPrice = wish.price > 0;
    const canContribute = hasJarLink(wish);
    const showsProgress = hasFixedPrice && canContribute;
    const left = Math.max(wish.price - wish.collected, 0);
    const hasGiftCounter = wish.giftCounter === true;
    const isReservable = !hasGiftCounter && wish.reservable !== false;
    const reserved = isReservable && reservations[wish.id] === true;
    const reservedByCurrentUser = reserved && reservationOwnership[wish.id] === true;
    const counterSelected = hasGiftCounter && giftCounterSelections.has(wish.id);

    card.dataset.targetId = wish.id;
    card.tabIndex = 0;
    card.classList.toggle("is-reserved", reserved);
    card.classList.toggle("is-counted", counterSelected);
    card.querySelector(".wish-image").src = wish.image;
    card.querySelector(".wish-image").alt = wish.title;
    card.querySelector(".wish-tag").textContent = wish.tag;
    card.querySelector(".wish-price").textContent = wish.priceLabel || (hasFixedPrice
      ? formatMoney(wish.price, wish.currency)
      : canContribute
        ? "любая сумма"
        : "без фиксированной цены");
    card.querySelector("h3").textContent = wish.title;
    card.querySelector(".wish-description").textContent = wish.description;

    if (showsProgress) {
      card.querySelector(".wish-collected").textContent = `Собрано ${formatMoney(wish.collected, wish.currency)}`;
      card.querySelector(".wish-left").textContent =
        left > 0 ? `Осталось ${formatMoney(left, wish.currency)}` : "Собрано";
      setProgress(card.querySelector(".progress-fill"), wish.collected, wish.price);
    } else {
      card.querySelector(".wish-progress").remove();
    }

    const reserveStatus = card.querySelector(".reserve-status");
    reserveStatus.hidden = !reserved;
    reserveStatus.textContent = reservedByCurrentUser ? "Забронировано вами" : "Забронировано";

    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      if (reserved) {
        showToast("Этот подарок уже забронирован.");
        return;
      }
      if (hasGiftCounter) {
        showToast(`Нажми «Я дарю», если тоже выбрала: ${wish.title}.`);
        return;
      }
      if (!canContribute) {
        showToast(`Можно забронировать: ${wish.title}.`);
        return;
      }

      selectTarget(wish.id);
      showToast(`Выбрано: ${wish.title}. Можно внести сумму ниже.`);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (!canContribute) return;
      selectTarget(wish.id, { scroll: true, amount: getSuggestedAmount(wish) });
    });

    const partialButton = card.querySelector('[data-action="partial"]');
    if (canContribute) {
      partialButton.textContent = "Внести сумму";
      partialButton.addEventListener("click", () => {
        selectTarget(wish.id, { scroll: true, amount: getSuggestedAmount(wish) });
        showToast(`Выбрано: ${wish.title}. Сумму можно поменять.`);
      });
    } else {
      partialButton.remove();
    }

    const reserveButton = card.querySelector('[data-action="reserve"]');
    if (isReservable) {
      if (reserved && !reservedByCurrentUser) {
        reserveButton.remove();
      } else {
        reserveButton.textContent = reserved ? "Убрать бронь" : "Забронировать";
        reserveButton.addEventListener("click", () => {
          setReservation(wish.id, !reserved);
        });
      }
    } else {
      reserveButton.remove();
    }

    const giftCounterControl = card.querySelector('[data-action="gift-count-control"]');
    if (hasGiftCounter) {
      const giftCounterButton = giftCounterControl.querySelector('[data-action="gift-count"]');
      const giftCounterValue = giftCounterControl.querySelector("strong");
      const giftCounterLabel = giftCounterControl.querySelector(".gift-count-label");
      const count = giftCounts[wish.id] || 0;

      giftCounterButton.textContent = counterSelected ? "Я дарю ✓" : "Я дарю";
      giftCounterButton.setAttribute("aria-pressed", String(counterSelected));
      giftCounterValue.textContent = String(count);
      giftCounterLabel.textContent = formatPeopleCount(count);
      giftCounterButton.addEventListener("click", () => {
        setGiftCounter(wish.id, !counterSelected);
      });
    } else {
      giftCounterControl.remove();
    }

    const productLink = card.querySelector('[data-action="product-link"]');
    if (wish.link && !reserved) {
      productLink.href = wish.link;
    } else {
      productLink.remove();
    }

    wishlistGrid.append(card);
  });
}

function getSuggestedAmount(target) {
  const amounts = target.quickAmounts;

  if (target.price <= 0) return amounts[1] || amounts[0];

  const left = Math.max(target.price - target.collected, 0);
  if (!left) return amounts[1] || amounts[0];
  return Math.min(Math.max(left, amounts[0]), amounts[amounts.length - 1]);
}

function updateSelectionUI() {
  const target = getSelectedTarget();
  const quickButtons = document.querySelectorAll("[data-amount]");

  fundTitle.textContent = target.fundTitle || `Копилка на ${target.title}`;
  fundDescription.textContent = target.fundDescription || target.description;
  selectedTargetName.textContent = target.shortTitle ? `${target.shortTitle} — ${target.title}` : target.title;
  amountCurrency.textContent = target.currency === "USD" ? "$" : "грн";
  giftAmount.min = "1";
  giftAmount.step = "1";

  quickButtons.forEach((button, index) => {
    const amount = target.quickAmounts[index] || target.quickAmounts[target.quickAmounts.length - 1];
    button.dataset.amount = String(amount);
    button.textContent = formatMoney(amount, target.currency);
  });

  document.querySelectorAll("[data-target]").forEach((button) => {
    const isActive = button.dataset.target === target.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll(".wish-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.targetId === target.id);
  });
}

function selectTarget(targetId, options = {}) {
  const target = getTarget(targetId);
  if (!target) return;

  selectedTargetId = target.id;
  giftAmount.value = options.amount ?? getSuggestedAmount(target);
  updateSelectionUI();

  if (options.scroll) {
    document.querySelector("#fund").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

async function copyGiftMessage(customLine, target = getSelectedTarget()) {
  const payment = hasJarLink(target) ? `Банка: ${target.monoJarUrl}` : "Ссылку на банку Monobank добавим отдельно.";
  const productLink = target.link ? ` Товар: ${target.link}.` : "";
  const message = `Привет! ${customLine}.${productLink} ${payment}`;

  try {
    await copyText(message);
    showToast(`Сообщение для "${target.title}" скопировано.`);
  } catch (error) {
    showToast("Не получилось скопировать автоматически. Можно выделить текст вручную.");
  }
}

function hasJarLink(target) {
  return /^https?:\/\//.test(target.monoJarUrl || "");
}

function openJar(target) {
  window.location.href = target.monoJarUrl;
}

function canUseReservationApi() {
  return Boolean(getReservationApiUrl());
}

function getReservationApiUrl() {
  if (RESERVATION_API_URL) return RESERVATION_API_URL;

  const hostname = window.location.hostname;
  const isLocalHost = RESERVATION_API_HOSTS.includes(hostname) || hostname.startsWith("192.168.");

  return isLocalHost ? "/api/reservations" : "";
}

function isRemoteReservationApi() {
  const apiUrl = getReservationApiUrl();

  return apiUrl && !apiUrl.startsWith("/");
}

function requestRemoteReservations(params = {}) {
  const apiUrl = getReservationApiUrl();

  return new Promise((resolve, reject) => {
    const callbackName = `wishlistReservationCallback${Date.now()}${Math.random().toString(36).slice(2)}`;
    const url = new URL(apiUrl);
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
      window.clearTimeout(timeout);
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Reservation API unavailable"));
    }, 8000);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    url.searchParams.set("callback", callbackName);

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Reservation API unavailable"));
    };

    script.src = url.toString();
    document.head.append(script);
  });
}

async function loadReservations() {
  if (sharedStateWriteInFlight) return;

  try {
    LEGACY_RESERVATION_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    const apiUrl = getReservationApiUrl();
    if (!reservationsApiAvailable) throw new Error("Reservation API unavailable");
    if (!apiUrl) throw new Error("Reservation API unavailable");

    let payload;
    if (isRemoteReservationApi()) {
      payload = await requestRemoteReservations({ action: "list", token: clientToken });
    } else {
      const url = new URL(apiUrl, window.location.href);
      url.searchParams.set("token", clientToken);
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Reservation API unavailable");
      payload = await response.json();
    }

    reservationsApiAvailable = true;
    applySharedGiftState(payload);
    localStorage.removeItem(RESERVATION_STORAGE_KEY);
  } catch (error) {
    reservationsApiAvailable = false;
    reservations = normalizeReservations(JSON.parse(localStorage.getItem(RESERVATION_STORAGE_KEY) || "{}"));
    reservationOwnership = { ...reservations };
    giftCounts = normalizeGiftCounts(JSON.parse(localStorage.getItem(GIFT_COUNTER_CACHE_KEY) || "{}"));
  }

  renderWishes();
  updateSelectionUI();
}

function normalizeReservations(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(([targetId, reserved]) => {
      const target = getTarget(targetId);
      return target && target.giftCounter !== true && target.reservable !== false && reserved === true;
    }),
  );
}

function normalizeReservationOwnership(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return normalizeReservations(value.__owned);
}

function normalizeGiftCounts(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(([targetId, count]) => {
      const target = getTarget(targetId);
      return target?.giftCounter === true && Number.isFinite(count) && count >= 0;
    }),
  );
}

function applySharedGiftState(payload) {
  reservations = normalizeReservations(payload);
  reservationOwnership = normalizeReservationOwnership(payload);
  giftCounts = normalizeGiftCounts(payload);
  localStorage.setItem(GIFT_COUNTER_CACHE_KEY, JSON.stringify(giftCounts));
}

async function setReservation(targetId, reserved) {
  if (!reserved && reservationOwnership[targetId] !== true) return;
  if (reserved && reservations[targetId] === true) return;

  reservations[targetId] = reserved;
  reservationOwnership[targetId] = reserved;
  reservations = normalizeReservations(reservations);
  reservationOwnership = normalizeReservations(reservationOwnership);
  renderWishes();
  updateSelectionUI();
  sharedStateWriteInFlight = true;

  try {
    const apiUrl = getReservationApiUrl();
    if (!reservationsApiAvailable) throw new Error("Reservation API unavailable");
    if (!apiUrl) throw new Error("Reservation API unavailable");

    let payload;
    if (isRemoteReservationApi()) {
      payload = await requestRemoteReservations({
        action: "set",
        id: targetId,
        reserved: reserved ? "1" : "0",
        token: clientToken,
      });
    } else {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ id: targetId, reserved, token: clientToken }),
      });

      if (!response.ok) throw new Error("Reservation API unavailable");
      payload = await response.json();
    }

    reservationsApiAvailable = true;
    applySharedGiftState(payload);
  } catch (error) {
    reservationsApiAvailable = false;
    localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservations));
  } finally {
    sharedStateWriteInFlight = false;
  }

  renderWishes();
  updateSelectionUI();
  showToast(reserved ? "Подарок забронирован." : "Бронь убрана.");
}

async function setGiftCounter(targetId, active) {
  const target = getTarget(targetId);
  if (target?.giftCounter !== true) return;

  const wasSelected = giftCounterSelections.has(targetId);
  if (wasSelected === active) return;

  if (active) {
    giftCounterSelections.add(targetId);
  } else {
    giftCounterSelections.delete(targetId);
  }

  giftCounts[targetId] = Math.max((giftCounts[targetId] || 0) + (active ? 1 : -1), 0);
  saveGiftCounterSelections();
  localStorage.setItem(GIFT_COUNTER_CACHE_KEY, JSON.stringify(giftCounts));
  renderWishes();
  updateSelectionUI();
  sharedStateWriteInFlight = true;

  try {
    const apiUrl = getReservationApiUrl();
    if (!reservationsApiAvailable || !apiUrl) throw new Error("Reservation API unavailable");

    let payload;
    if (isRemoteReservationApi()) {
      payload = await requestRemoteReservations({
        action: "count",
        id: targetId,
        active: active ? "1" : "0",
        token: clientToken,
      });
    } else {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "count", id: targetId, active, token: clientToken }),
      });

      if (!response.ok) throw new Error("Reservation API unavailable");
      payload = await response.json();
    }

    reservationsApiAvailable = true;
    applySharedGiftState(payload);
  } catch (error) {
    reservationsApiAvailable = false;
  } finally {
    sharedStateWriteInFlight = false;
  }

  renderWishes();
  updateSelectionUI();
  showToast(active ? `Отмечено: ${target.title}.` : `Отметка снята: ${target.title}.`);
}

document.querySelectorAll("[data-amount]").forEach((button) => {
  button.addEventListener("click", () => {
    giftAmount.value = button.dataset.amount;
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((tile) => {
  tile.addEventListener("click", () => {
    document.querySelector(tile.dataset.scrollTarget).scrollIntoView({ behavior: "smooth", block: "start" });
  });

  tile.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    document.querySelector(tile.dataset.scrollTarget).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-select-target]").forEach((link) => {
  link.addEventListener("click", () => {
    selectTarget(link.dataset.selectTarget, { amount: getSuggestedAmount(getTarget(link.dataset.selectTarget)) });
  });
});

giftForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const target = getSelectedTarget();
  const amount = Number(giftAmount.value || 0);

  if (!amount || amount <= 0) {
    showToast("Введи сумму больше нуля.");
    return;
  }

  if (hasJarLink(target)) {
    openJar(target);
  } else {
    showToast(`Для "${target.title}" пока нужно добавить ссылку на банку Monobank.`);
  }
});

loadCollectedState();
renderTargetChoices();
renderHeroProgress();
renderWishes();
selectTarget(profile.mainTargetId, { amount: getSuggestedAmount(getTarget(profile.mainTargetId)) });
loadReservations().then(() => {
  if (reservationsApiAvailable) {
    window.setInterval(loadReservations, RESERVATION_REFRESH_MS);
  }
});
