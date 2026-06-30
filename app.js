const STORAGE_KEY = "birthdayWishlistCollectedV4";
const LEGACY_STORAGE_KEYS = ["birthdayWishlistCollected", "birthdayWishlistCollectedV2", "birthdayWishlistCollectedV3"];
const RESERVATION_STORAGE_KEY = "wishlistReservationsV2";
const LEGACY_RESERVATION_STORAGE_KEYS = ["wishlistReservations"];
const RESERVATION_REFRESH_MS = 4000;
const RESERVATION_API_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];

const profile = {
  name: "Стар",
  mainTargetId: "lyubchik",
};

const targets = [
  {
    id: "lyubchik",
    title: "Покупка Любчика",
    shortTitle: "Копилка на Любчика",
    tag: "главная копилка",
    price: 26929,
    collected: 0,
    currency: "UAH",
    image: "assets/hero-stable.png",
    description: "Любчик — пони, которого я очень хочу выкупить. Это самая большая и самая важная мечта.",
    fundTitle: "Копилка на Любчика",
    fundDescription: "Главная цель — выкупить Любчика, пони, которого я очень хочу забрать себе.",
    quickAmounts: [500, 1000, 3000],
    monoJarUrl: "https://send.monobank.ua/jar/9pQWkwUwpQ",
  },
  {
    id: "anemone-saddle-pad",
    title: "Вальтрап Anemone",
    tag: "для тренировок",
    price: 4937,
    collected: 0,
    currency: "UAH",
    image: "assets/anemone-saddle-pad-cutout.png",
    description: "Вальтрап Anemone — мягкая подкладка между седлом и спиной лошади. Он нужен, чтобы лошади было комфортнее и ничего не натирало.",
    fundTitle: "Копилка на вальтрап Anemone",
    fundDescription: "Эта копилка относится только к вальтрапу Anemone. Вальтрап — это мягкая подкладка под седло, чтобы лошади было комфортнее.",
    quickAmounts: [300, 500, 1000],
    link: "https://equestrianstockholm.com/products/jump-saddle-pad-anemone-full",
    monoJarUrl: "https://send.monobank.ua/jar/4TkhDeATb9",
  },
  {
    id: "anemone-ear-bonnet",
    title: "Ушки Anemone",
    tag: "чтобы конь не пугался",
    price: 3141,
    collected: 0,
    currency: "UAH",
    image: "assets/anemone-ear-bonnet-cutout.png",
    description: "Ушки Anemone — шапочка на уши лошади. Она приглушает резкие звуки, чтобы коню было спокойнее на тренировке.",
    fundTitle: "Копилка на ушки Anemone",
    fundDescription: "Эта копилка относится только к ушкам Anemone. Можно внести любую часть суммы.",
    quickAmounts: [200, 500, 1000],
    link: "https://equestrianstockholm.com/products/ear-bonnet-anemone",
    monoJarUrl: "https://send.monobank.ua/jar/74TSFdmiR6",
  },
  {
    id: "sycamore-ear-bonnet",
    title: "Ушки Sycamore Green",
    tag: "чтобы конь не пугался",
    price: 3140,
    collected: 0,
    currency: "UAH",
    image: "assets/sycamore-ear-bonnet-cutout.png",
    description: "Ушки Sycamore Green — шапочка на уши лошади. Она защищает от шума и подходит к зелёному комплекту.",
    fundTitle: "Копилка на ушки Sycamore Green",
    fundDescription: "Эта копилка относится только к ушкам Sycamore Green.",
    quickAmounts: [200, 500, 1000],
    link: "https://equestrianstockholm.com/products/ear-bonnet-sycamore-green?pr_prod_strat=pinned&pr_rec_id=fa47a877c&pr_rec_pid=7764476199112&pr_ref_pid=7764476100808&pr_seq=uniform",
    monoJarUrl: "https://send.monobank.ua/jar/7cVH1Q12o3",
  },
  {
    id: "sycamore-saddle-pad",
    title: "Вальтрап Sycamore Green",
    tag: "для тренировок",
    price: 4937,
    collected: 0,
    currency: "UAH",
    image: "assets/sycamore-saddle-pad-cutout.png",
    description: "Вальтрап Sycamore Green — мягкая подкладка между седлом и спиной лошади, чтобы было комфортнее и не натирало.",
    fundTitle: "Копилка на вальтрап Sycamore Green",
    fundDescription: "Эта копилка относится только к вальтрапу Sycamore Green. Вальтрап — это мягкая подкладка под седло для комфорта лошади.",
    quickAmounts: [300, 500, 1000],
    link: "https://equestrianstockholm.com/products/jump-saddle-pad-sycamore-green-full?variant=43752748581064",
    monoJarUrl: "https://send.monobank.ua/jar/73stkkmpnD",
  },
  {
    id: "kingsland-lucca-halter",
    title: "Недоуздок Kingsland Lucca",
    tag: "с чомбуром",
    price: 3577,
    collected: 0,
    currency: "UAH",
    image: "assets/kingsland-lucca-halter-cutout.png",
    description: "Недоуздок — это как мягкая «уздечка» без железа во рту: надевается на голову, чтобы вести или привязывать лошадь. В комплекте есть чомбур.",
    fundTitle: "Копилка на Kingsland Lucca",
    fundDescription: "Эта копилка относится только к комплекту Kingsland Lucca Halter and Rope.",
    quickAmounts: [300, 500, 1000],
    link: "https://kingslandequestrian.com/products/kllucca-halter-and-rope",
    monoJarUrl: "https://send.monobank.ua/jar/5AmtfntL4N",
  },
  {
    id: "eskadron-halter",
    title: "Недоуздок Eskadron",
    tag: "с мехом",
    price: 3060,
    collected: 0,
    currency: "UAH",
    image: "assets/eskadron-halter-cutout.png",
    description: "Недоуздок Eskadron — штука на голову лошади без железа во рту, чтобы вести её рядом. Мех делает его мягче и помогает не натирать.",
    fundTitle: "Копилка на недоуздок Eskadron",
    fundDescription: "Эта копилка относится только к недоуздку Eskadron с мехом.",
    quickAmounts: [300, 500, 1000],
    link: "https://happyhorse.net.ua/ua/product/nedouzdok-s-mehom-classic-sports-pin-bucklesheepskin-eskadron",
    monoJarUrl: "https://send.monobank.ua/jar/2m9ZU3a1BX",
  },
  {
    id: "hv-polo-lead-rope",
    title: "Чомбур HV Polo",
    tag: "с безопасным карабином",
    price: 770,
    collected: 0,
    currency: "UAH",
    image: "assets/hv-polo-lead-rope-cutout.png",
    description: "Чомбур HV Polo — специальная верёвка с карабином. Её пристёгивают к недоуздку, чтобы вести лошадь рядом.",
    fundTitle: "Копилка на чомбур HV Polo",
    fundDescription: "Эта копилка относится только к чомбуру HV Polo с безопасным карабином.",
    quickAmounts: [100, 200, 500],
    link: "https://happyhorse.net.ua/ua/product/chombur-s-bezopasnym-karabinom-hatton-ph-hv-polo",
    monoJarUrl: "https://send.monobank.ua/jar/2fxjV22bAf",
  },
  {
    id: "karat-rent",
    title: "Аренда Карата",
    tag: "Большая мечта",
    price: 44882,
    collected: 0,
    currency: "UAH",
    image: "assets/karat-photo.jpeg",
    description: "Аренда нужна, чтобы регулярно работать с конкретным конём. Когда я беру коня в аренду, прогресс идёт очень быстро.",
    fundTitle: "Копилка на аренду Карата",
    fundDescription: "Аренда нужна, чтобы регулярно работать с конкретным конём. Когда я беру коня в аренду, прогресс идёт очень быстро. Карат мне очень нравится, а месяц аренды стоит примерно 44 882 грн / $1 000.",
    quickAmounts: [1000, 3000, 5000],
    monoJarUrl: "https://send.monobank.ua/jar/A25X9vzyXN",
  },
];

const cardTargetIds = [
  "anemone-saddle-pad",
  "anemone-ear-bonnet",
  "sycamore-ear-bonnet",
  "sycamore-saddle-pad",
  "kingsland-lucca-halter",
  "eskadron-halter",
  "hv-polo-lead-rope",
  "karat-rent",
];
const choiceTargetIds = ["lyubchik", ...cardTargetIds];
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

function formatMoney(value, currency = "UAH") {
  if (currency === "USD") {
    return `$${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value)}`;
  }

  return `${money.format(value)} грн`;
}

function getTarget(id) {
  return targets.find((target) => target.id === id);
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

  text.textContent = `${formatMoney(mainTarget.collected, mainTarget.currency)} из ${formatMoney(
    mainTarget.price,
    mainTarget.currency,
  )}`;
  setProgress(bar, mainTarget.collected, mainTarget.price);
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
    const left = Math.max(wish.price - wish.collected, 0);
    const isReservable = wish.id !== "karat-rent";
    const reserved = isReservable && reservations[wish.id] === true;

    card.dataset.targetId = wish.id;
    card.tabIndex = 0;
    card.classList.toggle("is-reserved", reserved);
    card.querySelector(".wish-image").src = wish.image;
    card.querySelector(".wish-image").alt = wish.title;
    card.querySelector(".wish-tag").textContent = wish.tag;
    card.querySelector(".wish-price").textContent = formatMoney(wish.price, wish.currency);
    card.querySelector("h3").textContent = wish.title;
    card.querySelector(".wish-description").textContent = wish.description;
    card.querySelector(".wish-collected").textContent = `Собрано ${formatMoney(wish.collected, wish.currency)}`;
    card.querySelector(".wish-left").textContent =
      left > 0 ? `Осталось ${formatMoney(left, wish.currency)}` : "Собрано";
    setProgress(card.querySelector(".progress-fill"), wish.collected, wish.price);
    card.querySelector(".reserve-status").hidden = !reserved;

    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      selectTarget(wish.id);
      showToast(`Выбрано: ${wish.title}. Можно внести часть ниже.`);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectTarget(wish.id, { scroll: true, amount: getSuggestedAmount(wish) });
    });

    card.querySelector('[data-action="partial"]').addEventListener("click", () => {
      selectTarget(wish.id, { scroll: true, amount: getSuggestedAmount(wish) });
      showToast(`Выбрано: ${wish.title}. Поставила примерную сумму, ее можно поменять.`);
    });

    const partialButton = card.querySelector('[data-action="partial"]');
    partialButton.disabled = reserved;
    partialButton.textContent = reserved ? "Уже забронировано" : "Внести часть";

    const reserveButton = card.querySelector('[data-action="reserve"]');
    if (isReservable) {
      reserveButton.textContent = reserved ? "Убрать бронь" : "Забронировать";
      reserveButton.addEventListener("click", () => {
        setReservation(wish.id, !reserved);
      });
    } else {
      reserveButton.remove();
    }

    const productLink = card.querySelector('[data-action="product-link"]');
    if (wish.link) {
      productLink.href = wish.link;
    } else {
      productLink.remove();
    }

    wishlistGrid.append(card);
  });
}

function getSuggestedAmount(target) {
  const left = Math.max(target.price - target.collected, 0);
  const amounts = target.quickAmounts;

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
  const hostname = window.location.hostname;

  return RESERVATION_API_HOSTS.includes(hostname) || hostname.startsWith("192.168.");
}

async function loadReservations() {
  try {
    LEGACY_RESERVATION_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    if (!canUseReservationApi()) throw new Error("Reservation API unavailable");

    const response = await fetch("/api/reservations", { cache: "no-store" });
    if (!response.ok) throw new Error("Reservation API unavailable");
    reservations = normalizeReservations(await response.json());
    localStorage.removeItem(RESERVATION_STORAGE_KEY);
  } catch (error) {
    reservations = normalizeReservations(JSON.parse(localStorage.getItem(RESERVATION_STORAGE_KEY) || "{}"));
  }

  renderWishes();
  updateSelectionUI();
}

function normalizeReservations(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(([targetId, reserved]) => getTarget(targetId) && reserved === true),
  );
}

async function setReservation(targetId, reserved) {
  reservations[targetId] = reserved;
  reservations = normalizeReservations(reservations);
  renderWishes();
  updateSelectionUI();

  try {
    if (!canUseReservationApi()) throw new Error("Reservation API unavailable");

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: targetId, reserved }),
    });

    if (!response.ok) throw new Error("Reservation API unavailable");
    reservations = normalizeReservations(await response.json());
  } catch (error) {
    localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservations));
  }

  renderWishes();
  updateSelectionUI();
  showToast(reserved ? "Подарок забронирован." : "Бронь убрана.");
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
loadReservations();
if (canUseReservationApi()) {
  window.setInterval(loadReservations, RESERVATION_REFRESH_MS);
}
