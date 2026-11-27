'use strict';

(() => {
  function normalize(value) {
    if (typeof value !== 'string') return '';
    return value.toLowerCase().replace(/[‘’]/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
  }

  function stripAccents(value) {
    if (typeof value !== 'string') return '';
    return normalize(value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd'));
  }

  function levenshtein(a, b) {
    let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
      const row = [i];
      for (let j = 1; j <= b.length; j++) {
        row[j] = Math.min(row[j - 1] + 1, previous[j] + 1, previous[j - 1] + Number(a[i - 1] !== b[j - 1]));
      }
      previous = row;
    }
    return previous[b.length];
  }

  function checkTyping(input, item) {
    const value = normalize(input);
    if (!value) return 'sai';
    const answers = [item.en, ...(item.alt ?? [])].map(normalize);
    if (answers.includes(value)) return 'dung';
    const near = answers.some((answer) => answer.length >= 4 &&
      levenshtein(value, answer) <= (answer.length >= 9 ? 2 : 1));
    return near ? 'gan-dung' : 'sai';
  }

  function shuffle(arr, rng = Math.random) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function makeChoice(item, pool, direction, rng = Math.random) {
    const [promptKey, answerKey] = direction === 'vi-en' ? ['vi', 'en'] : ['en', 'vi'];
    const correct = item[answerKey];
    const vietnamese = stripAccents(item.vi);
    const english = new Set([item.en, ...(item.alt ?? [])].map(stripAccents));
    const seen = new Set(answerKey === 'en' ? english : [vietnamese]);
    for (const word of pool) {
      if (stripAccents(word.vi) === vietnamese ||
          [word.en, ...(word.alt ?? [])].some((label) => english.has(stripAccents(label)))) {
        seen.add(stripAccents(word[answerKey]));
      }
    }
    const options = [correct];
    const candidates = shuffle(pool.filter((word) => word.id !== item.id), rng);
    const sameTopic = candidates.filter((word) => word.topic === item.topic);
    const otherTopics = candidates.filter((word) => word.topic !== item.topic);
    for (const word of sameTopic.concat(otherTopics)) {
      const label = word[answerKey];
      const key = stripAccents(label);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      options.push(label);
      if (options.length === 4) break;
    }
    const choices = shuffle(options, rng);
    return { id: item.id, prompt: item[promptKey], choices, answer: choices.indexOf(correct) };
  }

  function makeMatch(items, rng = Math.random) {
    const left = items.map(({ id, en }) => ({ id, text: en }));
    const right = shuffle(items.map(({ id, vi }) => ({ id, text: vi })), rng);
    return { left, right };
  }

  function hintFor(item, level) {
    if (level >= 3) return item.en;
    return item.en.replace(/\p{L}+/gu, (word) => {
      const letters = Array.from(word);
      return letters.map((letter, index) =>
        index === 0 || (level === 2 && index === letters.length - 1) ? letter : '_').join('');
    });
  }

  const api = { normalize, stripAccents, levenshtein, checkTyping, shuffle, makeChoice, makeMatch, hintFor };
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.VsepQuiz = api;
})();
