'use strict';

(() => {
  const srs = typeof module === 'object' && module.exports ? require('./srs.js') : window.VsepSrs;
  const STORE_KEY = 'vsep-beiu-v1';
  const dateKey = /^\d{4}-\d{2}-\d{2}$/;
  const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

  function defaults() {
    return { version: 1, cards: {}, days: [], answers: {}, settings: { dailyGoal: 20, rate: 0.9, voice: '' } };
  }

  function todayKey(now) {
    const date = new Date(now);
    return [String(date.getFullYear()).padStart(4, '0'), String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')].join('-');
  }

  function sanitize(obj) {
    const clean = defaults();
    if (!isObject(obj)) return clean;
    if (isObject(obj.cards)) {
      const entries = Object.entries(obj.cards).flatMap(([id, card]) => {
        if (!isObject(card)) return [];
        const { box, due, right, wrong, last } = card;
        if (!Number.isInteger(box) || box < 0 || box > 5 || ![due, right, wrong, last].every(Number.isFinite)) {
          return [];
        }
        return [[id, { box, due, right, wrong, last }]];
      });
      clean.cards = Object.fromEntries(entries);
    }
    if (Array.isArray(obj.days)) {
      clean.days = [...new Set(obj.days.filter((day) => typeof day === 'string' && dateKey.test(day)))].sort();
    }
    if (isObject(obj.answers)) {
      clean.answers = Object.fromEntries(Object.entries(obj.answers).filter(([day, count]) =>
        dateKey.test(day) && Number.isInteger(count) && count >= 0));
    }
    if (isObject(obj.settings)) {
      const { dailyGoal, rate, voice } = obj.settings;
      if (Number.isInteger(dailyGoal) && dailyGoal >= 5 && dailyGoal <= 100) clean.settings.dailyGoal = dailyGoal;
      if (Number.isFinite(rate) && rate >= 0.6 && rate <= 1.2) clean.settings.rate = rate;
      if (typeof voice === 'string') clean.settings.voice = voice;
    }
    return clean;
  }

  function load(storage) {
    try {
      return sanitize(JSON.parse(storage.getItem(STORE_KEY)));
    } catch {
      return defaults();
    }
  }

  function save(storage, data) {
    try {
      storage.setItem(STORE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  function recordAnswer(data, id, result, now) {
    const day = todayKey(now);
    const card = Object.hasOwn(data.cards, id) ? data.cards[id] : srs.newCard();
    return {
      ...data,
      cards: { ...data.cards, [id]: srs.review(card, result, now) },
      days: data.days.includes(day) ? [...data.days] : [...data.days, day].sort(),
      answers: { ...data.answers, [day]: (data.answers[day] ?? 0) + 1 }
    };
  }

  const exportText = (data) => JSON.stringify(data, null, 2);

  function importText(text) {
    try {
      const obj = JSON.parse(text);
      return isObject(obj) && obj.version === 1 ? sanitize(obj) : null;
    } catch {
      return null;
    }
  }

  const api = { STORE_KEY, defaults, todayKey, sanitize, load, save, recordAnswer, exportText, importText };
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.VsepStore = api;
})();
