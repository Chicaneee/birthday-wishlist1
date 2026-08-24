const RESERVATION_STORE_KEY = "wishlist_reservations";
const COUNTER_STORE_KEY = "wishlist_gift_counters";
const RESERVATION_IDS = [
  "big-plush",
  "cat-photo-pillow",
  "night-light",
  "soap-dispenser",
  "fried-ice-cream-maker",
];
const COUNTER_IDS = ["handmade-gift", "horse-treats"];

function doGet(event) {
  const params = event.parameter || {};
  const action = params.action || "list";
  const lock = LockService.getScriptLock();

  if (action === "set") {
    lock.waitLock(5000);
    try {
      updateReservation(params.id, params.token, params.reserved === "1");
      return respond(readPublicState(params.token), params.callback);
    } finally {
      lock.releaseLock();
    }
  }

  if (action === "count") {
    lock.waitLock(5000);
    try {
      updateGiftCounter(params.id, params.token, params.active === "1");
      return respond(readPublicState(params.token), params.callback);
    } finally {
      lock.releaseLock();
    }
  }

  return respond(readPublicState(params.token), params.callback);
}

function updateReservation(id, token, reserved) {
  if (!RESERVATION_IDS.includes(id) || !isValidToken(token)) return;

  const reservations = readReservations();
  const ownerToken = reservations[id];

  if (reserved && !ownerToken) {
    reservations[id] = token;
  } else if (!reserved && ownerToken === token) {
    delete reservations[id];
  }

  PropertiesService.getScriptProperties().setProperty(
    RESERVATION_STORE_KEY,
    JSON.stringify(reservations),
  );
}

function updateGiftCounter(id, token, active) {
  if (!COUNTER_IDS.includes(id) || !isValidToken(token)) return;

  const counters = readGiftCounters();
  const people = new Set(counters[id] || []);

  if (active) {
    people.add(token);
  } else {
    people.delete(token);
  }

  counters[id] = Array.from(people);
  PropertiesService.getScriptProperties().setProperty(COUNTER_STORE_KEY, JSON.stringify(counters));
}

function readReservations() {
  const raw = PropertiesService.getScriptProperties().getProperty(RESERVATION_STORE_KEY);

  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, ownerToken]) => RESERVATION_IDS.includes(id) && isValidToken(ownerToken),
      ),
    );
  } catch (error) {
    return {};
  }
}

function readGiftCounters() {
  const raw = PropertiesService.getScriptProperties().getProperty(COUNTER_STORE_KEY);

  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);

    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([id, people]) => COUNTER_IDS.includes(id) && Array.isArray(people))
        .map(([id, people]) => [
          id,
          Array.from(new Set(people.filter((token) => isValidToken(token)))),
        ]),
    );
  } catch (error) {
    return {};
  }
}

function readPublicState(requesterToken) {
  const reservations = readReservations();
  const counters = readGiftCounters();
  const reserved = Object.fromEntries(Object.keys(reservations).map((id) => [id, true]));
  const owned = isValidToken(requesterToken)
    ? Object.fromEntries(
        Object.entries(reservations)
          .filter(([, ownerToken]) => ownerToken === requesterToken)
          .map(([id]) => [id, true]),
      )
    : {};
  const counts = Object.fromEntries(
    COUNTER_IDS.map((id) => [id, Array.isArray(counters[id]) ? counters[id].length : 0]),
  );

  return { ...reserved, ...counts, __owned: owned };
}

function isValidToken(token) {
  return /^[0-9A-Za-z_-]{8,80}$/.test(token || "");
}

function respond(payload, callback) {
  const json = JSON.stringify(payload);

  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    );
  }

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
