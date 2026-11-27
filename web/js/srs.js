'use strict';

(() => {
  const DAY = 86400000;
  const BOX_DAYS = Object.freeze([0, 1, 2, 4, 8, 16]);
  const MASTERED_BOX = 4;
  const newCard = () => ({ box: 0, due: 0, right: 0, wrong: 0, last: 0 });

  function review(card, result, now) {
    if (result === 'dung') {
      const box = Math.min(card.box + 1, 5);
      return { ...card, box, due: now + BOX_DAYS[box] * DAY, right: card.right + 1, last: now };
    }
    if (result === 'gan-dung') {
      return { ...card, box: Math.max(card.box, 1), due: now + DAY, right: card.right + 1, last: now };
    }
    if (result === 'sai') {
      return { ...card, box: 1, due: now, wrong: card.wrong + 1, last: now };
    }
    return card;
  }

  const isDue = (card, now) => card.box > 0 && card.due <= now;
  const pickMode = (card) => ['the', 'trac-nghiem', 'nghe'][card.box] ?? 'go-tu';

  function buildSession(ids, cards, now, { size = 10, newLimit = 5 } = {}) {
    const due = ids.filter((id) => Object.hasOwn(cards, id) && isDue(cards[id], now));
    due.sort((a, b) => cards[a].due - cards[b].due);
    const fresh = ids.filter((id) => !Object.hasOwn(cards, id) || cards[id].box === 0);
    return due.concat(fresh.slice(0, newLimit)).slice(0, size);
  }

  function stats(cards, vocab, now) {
    const counts = { total: vocab.length, learned: 0, mastered: 0, due: 0 };
    const topics = new Map();
    for (const { id, topic } of vocab) {
      if (!topics.has(topic)) topics.set(topic, { total: 0, learned: 0, mastered: 0 });
      const topicCounts = topics.get(topic);
      topicCounts.total++;
      if (!Object.hasOwn(cards, id)) continue;
      const card = cards[id];
      if (card.box >= 1) {
        counts.learned++;
        topicCounts.learned++;
      }
      if (card.box >= MASTERED_BOX) {
        counts.mastered++;
        topicCounts.mastered++;
      }
      if (isDue(card, now)) counts.due++;
    }
    return { ...counts, byTopic: Object.fromEntries(topics) };
  }

  function hardest(cards, vocab, limit = 10) {
    return vocab.filter(({ id }) => Object.hasOwn(cards, id) && cards[id].wrong > 0)
      .sort((a, b) => cards[b.id].wrong - cards[a.id].wrong || cards[a.id].right - cards[b.id].right)
      .slice(0, limit);
  }

  function streak(days, todayKey) {
    const studied = new Set(days);
    let day = Date.parse(todayKey);
    if (!Number.isFinite(day)) return 0;
    if (!studied.has(todayKey)) day -= DAY;
    let count = 0;
    while (studied.has(new Date(day).toISOString().slice(0, 10))) {
      count++;
      day -= DAY;
    }
    return count;
  }

  const api = { DAY, BOX_DAYS, MASTERED_BOX, newCard, review, isDue, pickMode, buildSession, stats, hardest, streak };
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.VsepSrs = api;
})();
