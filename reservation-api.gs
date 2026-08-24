const STORE_KEY = "wishlist_reservations";
const VALID_IDS = [
  "handmade-gift",
  "big-plush",
  "cat-photo-pillow",
  "night-light",
  "soap-dispenser",
  "horse-treats",
  "fried-ice-cream-maker",
];

function doGet(event) {
  const params = event.parameter || {};
  const action = params.action || "list";
  const lock = LockService.getScriptLock();

  if (action === "set") {
    lock.waitLock(5000);
    try {
      const id = params.id;
      const reserved = params.reserved === "1";
      const state = readState();

      if (VALID_IDS.includes(id)) {
        if (reserved) {
          state[id] = true;
        } else {
          delete state[id];
        }
      }

      writeState(state);
      return respond(state, params.callback);
    } finally {
      lock.releaseLock();
    }
  }

  return respond(readState(), params.callback);
}

function readState() {
  const raw = PropertiesService.getScriptProperties().getProperty(STORE_KEY);

  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);

    return Object.fromEntries(
      Object.entries(parsed).filter(([id, reserved]) => VALID_IDS.includes(id) && reserved === true),
    );
  } catch (error) {
    return {};
  }
}

function writeState(state) {
  PropertiesService.getScriptProperties().setProperty(STORE_KEY, JSON.stringify(state));
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
