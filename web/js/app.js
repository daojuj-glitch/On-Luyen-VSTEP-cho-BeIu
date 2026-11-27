'use strict';

(() => {
  const { VSEP_DATA: data, VsepSrs: srs, VsepQuiz: quiz, VsepStore: store } = window;
  const view = document.getElementById('view');
  const streakCount = document.getElementById('streak-count');
  const toastNode = document.getElementById('toast');
  const live = document.getElementById('sr-live');
  const modes = ['the', 'trac-nghiem', 'nghe', 'go-tu', 'ghep-cap', 'thong-minh'];
  const mediaUnavailable = 'Không dùng được micro. Bạn vẫn có thể tập nói theo gợi ý và đồng hồ.';
  const topicById = new Map(data.topics.map((topic) => [topic.id, topic]));
  const itemById = new Map(data.vocab.map((item) => [item.id, item]));
  const english = new Intl.Collator('en', { sensitivity: 'base' });
  const synthesis = window.speechSynthesis;
  let storage;
  try {
    storage = window.localStorage;
  } catch {
    storage = null;
  }
  let progress = store.load(storage);
  let session;
  let speaking;
  let toastTimer;
  let voiceWarning = false;
  let importRequest = 0;
  const speechText = new WeakMap();

  const field = (root, name) => root.querySelector('[data-field="' + name + '"]');
  const action = (root, name) => root.querySelector('[data-action="' + name + '"]');
  const text = (root, name, value) => { field(root, name).textContent = value; };
  const clone = (id) => document.getElementById(id).content.firstElementChild.cloneNode(true);
  const words = (id) => data.vocab.filter((item) => item.topic === id);
  const cardFor = (id) => Object.hasOwn(progress.cards, id) ? progress.cards[id] : srs.newCard();
  const topicHash = (id) => '#/chu-de/' + id;
  const studyHash = (id, mode) => '#/hoc/' + id + '/' + mode;
  const navigate = (hash) => { location.hash = hash; };
  const streak = () => srs.streak(progress.days, store.todayKey(Date.now()));

  function show(root) {
    view.replaceChildren(root);
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }

  function toast(message) {
    clearTimeout(toastTimer);
    toastNode.textContent = message;
    toastNode.hidden = false;
    toastTimer = setTimeout(() => { toastNode.hidden = true; }, 2500);
  }

  function save() {
    store.save(storage, progress);
    streakCount.textContent = streak();
  }

  function meter(node, count, total) {
    const percent = total ? Math.min(100, Math.round(100 * count / total)) : 0;
    node.setAttribute('aria-valuenow', percent);
    node.querySelector('[data-fill]').style.width = percent + '%';
  }

  function line(list, content) {
    const li = document.createElement('li');
    li.textContent = content;
    list.append(li);
  }

  function voices() {
    if (!synthesis || !window.SpeechSynthesisUtterance) return [];
    return synthesis.getVoices().filter((voice) => /^en/i.test(voice.lang));
  }

  function warnVoice() {
    if (voiceWarning) return;
    voiceWarning = true;
    toast('Máy chưa có giọng đọc tiếng Anh.');
  }

  function syncSpeech() {
    const available = voices().length > 0;
    for (const button of view.querySelectorAll('[data-action]')) {
      if (!speechText.has(button)) continue;
      button.disabled = !available;
      if (!available) warnVoice();
    }
  }

  function pronounce(content, slow = false) {
    const available = voices();
    const voice = available.find((option) => option.voiceURI === progress.settings.voice) ??
      available.find((option) => /^en-(US|GB)$/i.test(option.lang)) ?? available[0];
    if (!voice) {
      warnVoice();
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(content);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    utterance.rate = slow ? 0.6 : progress.settings.rate;
    synthesis.cancel();
    synthesis.speak(utterance);
  }

  function bindSpeech(button, content, label) {
    speechText.set(button, content);
    button.disabled = voices().length === 0;
    if (button.disabled) warnVoice();
    if (label) button.setAttribute('aria-label', label);
  }

  function wordRow(item) {
    const row = clone('tpl-word-row');
    const { box } = cardFor(item.id);
    const note = [item.alt.join(', '), item.note].filter(Boolean).join(' · ');
    text(row, 'en', item.en);
    text(row, 'vi', item.vi);
    text(row, 'note', note);
    field(row, 'note').hidden = !note;
    text(row, 'box', box ? 'Hộp ' + box : 'Mới');
    row.dataset.box = box;
    field(row, 'box').dataset.box = box;
    bindSpeech(action(row, 'speak'), item.en, 'Nghe ' + item.en);
    return row;
  }

  function topicCounts(stats, id) {
    return stats.byTopic[id] ?? { total: 0, learned: 0, mastered: 0 };
  }

  function firstNewTopic() {
    return data.topics.find((topic) => topic.kind === 'vocab' &&
      data.vocab.some((item) => item.topic === topic.id && cardFor(item.id).box === 0));
  }

  function home() {
    const root = clone('tpl-home');
    const now = Date.now();
    const stats = srs.stats(progress.cards, data.vocab, now);
    const count = progress.answers[store.todayKey(now)] ?? 0;
    const goal = progress.settings.dailyGoal;
    text(root, 'greeting', 'Chào BéIu! Hôm nay mình học gì nào?');
    text(root, 'goal-text', 'Hôm nay: ' + count + '/' + goal + ' lượt');
    text(root, 'due-count', stats.due + ' từ cần ôn');
    meter(field(root, 'goal-meter'), count, goal);
    action(root, 'start-review').disabled = !stats.due;
    action(root, 'start-new').disabled = !firstNewTopic();
    for (const topic of data.topics) {
      const node = clone('tpl-topic-card');
      const isSpeaking = topic.kind === 'speaking';
      const { total, mastered } = topicCounts(stats, topic.id);
      field(node, 'link').href = isSpeaking ? '#/noi/' + topic.id : topicHash(topic.id);
      field(node, 'icon').src = 'assets/topic-' + topic.id + '.svg';
      text(node, 'title-vi', topic.vi);
      text(node, 'title-en', topic.en);
      text(node, 'count', total + ' từ');
      text(node, 'mastery-text', 'Thuộc ' + mastered + '/' + total);
      meter(field(node, 'mastery-meter'), mastered, total);
      field(root, isSpeaking ? 'speaking-list' : 'topic-list').append(node);
    }
    show(root);
  }

  function topicScreen(topic) {
    const root = clone('tpl-topic');
    const items = words(topic.id);
    const stats = srs.stats(progress.cards, items, Date.now());
    field(root, 'back').href = '#/';
    text(root, 'title-vi', topic.vi);
    text(root, 'title-en', topic.en);
    text(root, 'stats', stats.learned + ' đã học · ' + stats.mastered + ' đã thuộc · ' + stats.due + ' cần ôn');
    field(root, 'word-list').append(...items.map(wordRow));
    const structures = field(root, 'structure-list');
    for (const entry of data.structures.filter((item) => item.topic === topic.id)) {
      const row = clone('tpl-structure-row');
      text(row, 'en', entry.en);
      text(row, 'vi', entry.vi);
      structures.append(row);
    }
    structures.hidden = !structures.childElementCount;
    show(root);
  }

  function startSession(topic, mode) {
    const now = Date.now();
    const review = !topic;
    const fixed = !review && mode !== 'thong-minh';
    const items = topic ? words(topic.id) : data.vocab;
    const ids = srs.buildSession(items.map(({ id }) => id), progress.cards, now, {
      newLimit: review ? 0 : fixed ? 10 : 5
    });
    if (fixed && ids.length < 4) {
      const extra = quiz.shuffle(items.filter(({ id }) => !ids.includes(id) && cardFor(id).box > 0));
      ids.push(...extra.slice(0, 4 - ids.length).map(({ id }) => id));
    }
    const queue = (review ? quiz.shuffle(ids) : ids).map((id) => ({
      item: itemById.get(id), mode: fixed ? mode : srs.pickMode(cardFor(id)), retry: false
    }));
    session = {
      topic, mode, queue, index: 0, attempted: 0, correct: 0, choiceIndex: 0, wrong: new Set(),
      title: topic ? topic.vi : 'Ôn tập', back: topic ? topicHash(topic.id) : '#/'
    };
    if (!queue.length) {
      summary(review ? 'Không có từ nào cần ôn lúc này.' : 'Không có từ nào để học lúc này.');
      return;
    }
    session.root = clone('tpl-session');
    text(session.root, 'title', session.title);
    show(session.root);
    question();
  }

  function sessionProgress() {
    const total = session.queue.length;
    const current = Math.min(session.index + (session.match?.done ?? 0) + 1, total);
    text(session.root, 'progress-text', 'Câu ' + current + '/' + total);
    meter(field(session.root, 'progress-meter'), current, total);
  }

  function question() {
    const { root, queue, index } = session;
    if (index >= queue.length) {
      summary();
      return;
    }
    synthesis?.cancel();
    const stage = field(root, 'stage');
    const current = queue[index];
    let { mode } = current;
    const { item } = current;
    if (mode === 'nghe' && !voices().length) {
      warnVoice();
      mode = 'trac-nghiem';
    }
    const template = {
      the: 'tpl-q-card', 'trac-nghiem': 'tpl-q-choice', nghe: 'tpl-q-listen',
      'go-tu': 'tpl-q-typing', 'ghep-cap': 'tpl-q-match'
    };
    const node = clone(template[mode]);
    session.current = current;
    session.question = node;
    session.questionMode = mode;
    session.hint = 0;
    session.answered = false;
    session.match = null;
    root.dataset.mode = mode;
    stage.dataset.mode = mode;
    text(root, 'feedback', '');
    live.textContent = '';
    action(root, 'next').hidden = true;
    stage.replaceChildren(node);
    if (mode === 'ghep-cap') {
      renderMatch(node);
    } else {
      const speak = action(node, 'speak');
      bindSpeech(speak, item.en);
      if (mode === 'the') {
        text(node, 'front', item.en);
        text(node, 'back', [item.vi, item.note].filter(Boolean).join(' · '));
        for (const button of node.querySelectorAll('[data-grade]')) button.disabled = true;
        field(node, 'card').setAttribute('aria-pressed', 'false');
        field(node, 'card').focus();
      } else if (mode === 'go-tu') {
        text(node, 'prompt', item.vi);
        text(node, 'hint', '');
        field(node, 'answer').focus();
      } else {
        const direction = mode === 'nghe' || session.choiceIndex++ % 2 === 0 ? 'en-vi' : 'vi-en';
        session.choice = quiz.makeChoice(item, data.vocab, direction);
        if (mode === 'trac-nghiem') {
          text(node, 'direction', direction === 'en-vi' ? 'Chọn nghĩa tiếng Việt' : 'Chọn từ tiếng Anh');
          text(node, 'prompt', session.choice.prompt);
          if (direction === 'vi-en') speak.hidden = true;
        } else {
          bindSpeech(action(node, 'speak-slow'), item.en);
        }
        for (const button of node.querySelectorAll('[data-choice]')) {
          const label = session.choice.choices[Number(button.dataset.choice)];
          button.hidden = label === undefined;
          button.disabled = button.hidden;
          button.textContent = label ?? '';
        }
        if (mode === 'nghe') {
          speak.focus();
          pronounce(item.en);
        } else {
          node.querySelector('[data-choice]:not([hidden])')?.focus();
        }
      }
    }
    sessionProgress();
  }

  function recordResult(entry, result) {
    const { item, retry } = entry;
    const previousCard = cardFor(item.id);
    progress = store.recordAnswer(progress, item.id, result, Date.now());
    if (retry && result === 'sai') progress.cards[item.id] = previousCard;
    save();
    if (retry) return;
    session.attempted++;
    if (result === 'dung') session.correct++;
    if (result === 'sai') {
      session.wrong.add(item.id);
      if (entry.mode !== 'ghep-cap') session.queue.push({ ...entry, retry: true });
    }
  }

  function feedback(item, result) {
    const answer = item.en + ' = ' + item.vi;
    const message = result === 'dung' ? 'Chính xác! ' + answer :
      result === 'gan-dung' ? 'Gần đúng — viết đúng là: ' + item.en : 'Chưa đúng — đáp án: ' + answer;
    text(session.root, 'feedback', message);
    live.textContent = message;
    return message;
  }

  function readyForNext() {
    session.answered = true;
    const next = action(session.root, 'next');
    next.hidden = false;
    next.focus();
  }

  function answer(result) {
    if (!session?.root || session.answered) return;
    recordResult(session.current, result);
    const message = feedback(session.current.item, result);
    if (session.questionMode === 'the') {
      nextQuestion();
      if (session.index < session.queue.length) text(session.root, 'feedback', message);
      live.textContent = message;
    } else {
      sessionProgress();
      readyForNext();
    }
  }

  function choose(button) {
    if (session.answered || button.disabled) return;
    const selected = Number(button.dataset.choice);
    const correct = session.choice.answer;
    for (const option of session.question.querySelectorAll('[data-choice]')) {
      const index = Number(option.dataset.choice);
      if (index === correct) option.dataset.state = 'correct';
      else if (index === selected) option.dataset.state = 'wrong';
      option.disabled = true;
    }
    answer(selected === correct ? 'dung' : 'sai');
  }

  function flip(card) {
    const showBack = card.dataset.side !== 'back';
    card.dataset.side = showBack ? 'back' : 'front';
    card.setAttribute('aria-pressed', String(showBack));
    for (const grade of session.question.querySelectorAll('[data-grade]')) grade.disabled = !showBack;
  }

  function nextQuestion() {
    session.index += session.match?.size ?? 1;
    question();
  }

  function renderMatch(node) {
    const entries = session.queue.slice(session.index, session.index + 5);
    const pairs = quiz.makeMatch(entries.map(({ item }) => item));
    const buttons = { left: [], right: [] };
    session.match = { size: entries.length, entries, buttons, wrong: new Set(), done: 0 };
    for (const side of ['left', 'right']) {
      for (const pair of pairs[side]) {
        const row = clone('tpl-match-item');
        const button = field(row, 'btn');
        button.textContent = pair.text;
        button.setAttribute('aria-pressed', 'false');
        buttons[side].push({ ...pair, button });
        field(node, side).append(row);
      }
    }
    buttons.left[0]?.button.focus();
  }

  function matchChoice(button) {
    const match = session.match;
    if (match.timer || button.disabled) return;
    const left = match.buttons.left.find((pair) => pair.button === button);
    if (left) {
      if (match.selected) {
        delete match.selected.button.dataset.state;
        match.selected.button.setAttribute('aria-pressed', 'false');
      }
      match.selected = left;
      button.dataset.state = 'selected';
      button.setAttribute('aria-pressed', 'true');
      match.buttons.right.find((pair) => !pair.button.disabled)?.button.focus();
      return;
    }
    const selected = match.selected;
    if (!selected) return;
    const right = match.buttons.right.find((pair) => pair.button === button);
    const expected = match.buttons.right.find((pair) => pair.id === selected.id);
    const entry = match.entries.find(({ item }) => item.id === selected.id);
    if (expected.text !== right.text) {
      match.wrong.add(selected.id);
      selected.button.dataset.state = button.dataset.state = 'wrong';
      const message = 'Cặp chưa đúng. Thử lại nhé.';
      text(session.root, 'feedback', message);
      live.textContent = message;
      match.timer = setTimeout(() => {
        delete selected.button.dataset.state;
        delete button.dataset.state;
        selected.button.setAttribute('aria-pressed', 'false');
        match.selected = null;
        match.timer = null;
        if (document.activeElement === button) selected.button.focus();
      }, 600);
      return;
    }
    // Identical meanings are interchangeable within the remaining pairs.
    [right.id, expected.id] = [expected.id, right.id];
    selected.button.dataset.state = button.dataset.state = 'done';
    selected.button.disabled = button.disabled = true;
    selected.button.setAttribute('aria-pressed', 'false');
    match.selected = null;
    match.done++;
    const result = match.wrong.has(selected.id) ? 'sai' : 'dung';
    recordResult(entry, result);
    feedback(entry.item, result);
    sessionProgress();
    if (match.done === match.size) readyForNext();
    else match.buttons.left.find((pair) => !pair.button.disabled)?.button.focus();
  }

  function summary(emptyDetail) {
    const root = clone('tpl-summary');
    const { correct, attempted, wrong } = session;
    const percent = attempted ? Math.round(correct * 100 / attempted) : 0;
    const encouragement = percent >= 80 ? 'Tuyệt vời!' : percent >= 50 ?
      'Cố lên, gần thuộc rồi!' : 'Mình ôn lại các từ dưới đây nhé.';
    text(root, 'score', correct + '/' + attempted);
    text(root, 'detail', emptyDetail ?? 'Bạn đã trả lời đúng ' + percent + '%. ' + encouragement);
    field(root, 'wrong-list').append(...Array.from(wrong, (id) => wordRow(itemById.get(id))));
    action(root, 'home').href = '#/';
    session.root = null;
    show(root);
  }

  function speakingScreen(topic, lesson) {
    const root = clone('tpl-speaking');
    const record = action(root, 'record');
    speaking = { root, lesson, index: 0, recordLabel: record.textContent.trim() || 'Ghi âm' };
    field(root, 'back').href = '#/';
    text(root, 'title', topic.vi);
    const outline = field(root, 'outline');
    for (const entry of lesson.outline) {
      const row = clone('tpl-outline-item');
      text(row, 'label', entry.label);
      text(row, 'en', entry.en);
      text(row, 'vi', entry.vi);
      outline.append(row);
    }
    const ideas = field(root, 'ideas');
    const shown = new Set();
    for (const { en, vi } of lesson.ideas.concat(words(topic.id))) {
      const key = quiz.normalize(en);
      if (shown.has(key)) continue;
      shown.add(key);
      line(ideas, en + ' — ' + vi);
    }
    record.setAttribute('aria-pressed', 'false');
    if (!window.MediaRecorder || !navigator.mediaDevices?.getUserMedia) disableRecord(speaking);
    renderSpeakingQuestion();
    show(root);
  }

  function renderSpeakingQuestion() {
    const { root, lesson, index } = speaking;
    const entry = lesson.questions[index];
    text(root, 'question-en', entry.en);
    text(root, 'question-vi', entry.vi);
    text(root, 'question-count', 'Câu ' + (index + 1) + '/' + lesson.questions.length);
    bindSpeech(action(root, 'speak'), entry.en);
  }

  function toggleTimer(button) {
    const state = speaking;
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
      text(state.root, 'timer', '0:45');
      button.setAttribute('aria-pressed', 'false');
      return;
    }
    button.setAttribute('aria-pressed', 'true');
    const end = Date.now() + 45000;
    text(state.root, 'timer', '0:45');
    state.timer = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      text(state.root, 'timer', '0:' + String(seconds).padStart(2, '0'));
      if (seconds) return;
      clearInterval(state.timer);
      state.timer = null;
      button.setAttribute('aria-pressed', 'false');
      toast('Hết giờ! Thử nói lại với ý mới nhé.');
    }, 200);
  }

  function disableRecord(state) {
    const button = action(state.root, 'record');
    button.setAttribute('aria-pressed', 'false');
    button.textContent = state.recordLabel;
    button.disabled = true;
    text(state.root, 'record-status', mediaUnavailable);
  }

  const stopTracks = (stream) => stream?.getTracks().forEach((track) => track.stop());

  async function toggleRecord(button) {
    const state = speaking;
    if (state.recorder?.state === 'recording') {
      button.disabled = true;
      state.recorder.stop();
      return;
    }
    const playback = field(state.root, 'playback');
    button.disabled = true;
    text(state.root, 'record-status', 'Đang xin quyền dùng micro…');
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (speaking !== state) {
        stopTracks(stream);
        return;
      }
      const recorder = new window.MediaRecorder(stream);
      state.stream = stream;
      state.recorder = recorder;
      const chunks = [];
      let failed = false;
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size) chunks.push(event.data);
      });
      recorder.addEventListener('error', () => {
        failed = true;
        stopTracks(stream);
        if (speaking === state) disableRecord(state);
      });
      recorder.addEventListener('stop', () => {
        stopTracks(stream);
        if (speaking !== state || failed) return;
        state.recorder = state.stream = null;
        button.disabled = false;
        button.textContent = state.recordLabel;
        button.setAttribute('aria-pressed', 'false');
        if (!chunks.length) {
          text(state.root, 'record-status', 'Chưa thu được âm thanh. Bạn có thể thử lại.');
          return;
        }
        if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
        state.audioUrl = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || chunks[0].type }));
        playback.src = state.audioUrl;
        playback.hidden = false;
        text(state.root, 'record-status', 'Đã ghi âm. Bạn có thể nghe lại.');
      });
      recorder.start();
      playback.pause();
      playback.hidden = true;
      button.disabled = false;
      button.textContent = 'Dừng ghi';
      button.setAttribute('aria-pressed', 'true');
      text(state.root, 'record-status', 'Đang ghi âm…');
    } catch {
      stopTracks(stream);
      if (speaking === state) disableRecord(state);
    }
  }

  function leaveSpeaking() {
    if (!speaking) return;
    const state = speaking;
    speaking = null;
    clearInterval(state.timer);
    if (state.recorder && state.recorder.state !== 'inactive') state.recorder.stop();
    stopTracks(state.stream);
    if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
  }

  function fillVoices(form) {
    const select = form.elements.namedItem('voice');
    const available = voices().sort((a, b) => english.compare(a.name, b.name));
    select.replaceChildren(new Option('Tự chọn', ''), ...available.map((voice) =>
      new Option(voice.name + ' (' + voice.lang + ')', voice.voiceURI)));
    select.value = available.some((voice) => voice.voiceURI === progress.settings.voice) ? progress.settings.voice : '';
  }

  function progressScreen() {
    const root = clone('tpl-progress');
    const stats = srs.stats(progress.cards, data.vocab, Date.now());
    for (const key of ['total', 'learned', 'mastered']) text(root, key, stats[key]);
    text(root, 'streak', streak());
    for (const topic of data.topics) {
      const row = clone('tpl-progress-row');
      const { total, learned, mastered } = topicCounts(stats, topic.id);
      text(row, 'topic', topic.vi);
      text(row, 'learned', learned);
      text(row, 'mastered', mastered);
      meter(field(row, 'meter'), mastered, total);
      field(root, 'topic-table').append(row);
    }
    const hard = srs.hardest(progress.cards, data.vocab);
    const list = field(root, 'hard-list');
    if (hard.length) list.append(...hard.map(wordRow));
    else line(list, 'Chưa có từ nào sai. Giỏi lắm!');
    const form = field(root, 'settings');
    fillVoices(form);
    for (const name of ['dailyGoal', 'rate']) form.elements.namedItem(name).value = progress.settings[name];
    for (const { en, from, to } of data.corrections) {
      line(field(root, 'corrections'), en + ': ' + from + ' → ' + to);
    }
    show(root);
  }

  function exportProgress() {
    const url = URL.createObjectURL(new Blob([store.exportText(progress)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'on-luyen-vstep-' + store.todayKey(Date.now()) + '.json';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importProgress(input) {
    const request = ++importRequest;
    const file = input.files[0];
    input.value = '';
    if (!file) return;
    let imported;
    try {
      imported = store.importText(await file.text());
    } catch {
      imported = null;
    }
    if (request !== importRequest || !view.contains(input)) return;
    if (!imported) {
      toast('File không hợp lệ.');
      return;
    }
    progress = imported;
    save();
    progressScreen();
    toast('Đã nhập tiến độ.');
  }

  function route() {
    leaveSpeaking();
    clearTimeout(session?.match?.timer);
    session = null;
    synthesis?.cancel();
    live.textContent = '';
    const hash = location.hash;
    const parts = hash.startsWith('#/') ? hash.slice(2).split('/') : [];
    const [page, id, mode] = parts;
    const topic = topicById.get(id);
    const lesson = page === 'noi' && data.speaking.find((entry) => entry.topic === id);
    let nav = 'home';
    if (parts.length === 1 && page === 'on-tap') {
      nav = 'review';
      startSession(null, 'thong-minh');
    } else if (parts.length === 1 && page === 'tien-do') {
      nav = 'progress';
      progressScreen();
    } else if (parts.length === 2 && page === 'chu-de' && topic) {
      topicScreen(topic);
    } else if (parts.length === 3 && page === 'hoc' && topic && modes.includes(mode)) {
      startSession(topic, mode);
    } else if (parts.length === 2 && topic && lesson) {
      speakingScreen(topic, lesson);
    } else {
      home();
    }
    for (const link of document.querySelectorAll('[data-nav]')) {
      if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    streakCount.textContent = streak();
  }

  view.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action], button[data-mode], [data-choice], [data-grade], [data-field="card"], [data-field="btn"]');
    if (!button || button.disabled) return;
    const { action: name, mode, grade, choice, field: kind } = button.dataset;
    if (speechText.has(button)) {
      pronounce(speechText.get(button), name === 'speak-slow');
    } else if (choice !== undefined) {
      choose(button);
    } else if (grade) {
      answer(grade);
    } else if (kind === 'card') {
      flip(button);
    } else if (kind === 'btn') {
      matchChoice(button);
    } else if ((mode && modes.includes(mode)) || name === 'start-smart') {
      navigate(studyHash(location.hash.split('/')[2], mode || 'thong-minh'));
    } else {
      switch (name) {
        case 'start-review':
          navigate('#/on-tap');
          break;
        case 'start-new': {
          const topic = firstNewTopic();
          if (topic) navigate(studyHash(topic.id, 'thong-minh'));
          break;
        }
        case 'next':
          if (session.answered) nextQuestion();
          break;
        case 'quit':
          navigate(session.back);
          break;
        case 'again':
          startSession(session.topic, session.mode);
          break;
        case 'hint':
          session.hint = Math.min(3, session.hint + 1);
          text(session.question, 'hint', quiz.hintFor(session.current.item, session.hint));
          field(session.question, 'answer').focus();
          break;
        case 'next-question':
          synthesis?.cancel();
          speaking.index = (speaking.index + 1) % speaking.lesson.questions.length;
          renderSpeakingQuestion();
          break;
        case 'timer':
          toggleTimer(button);
          break;
        case 'record':
          void toggleRecord(button);
          break;
        case 'export':
          exportProgress();
          break;
        case 'reset':
          if (window.confirm('Xóa toàn bộ tiến độ học? Không hoàn tác được.')) {
            importRequest++;
            progress = { ...store.defaults(), settings: progress.settings };
            save();
            progressScreen();
          }
          break;
      }
    }
  });

  view.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.dataset.field !== 'form' || session.answered) return;
    const input = field(form, 'answer');
    let result = quiz.checkTyping(input.value, session.current.item);
    if (result === 'dung' && session.hint === 3) result = 'gan-dung';
    for (const control of form.elements) control.disabled = true;
    action(session.question, 'hint').disabled = true;
    answer(result);
  });

  view.addEventListener('change', (event) => {
    const input = event.target;
    if (input.dataset.field === 'import') {
      void importProgress(input);
    } else if (input.form?.dataset.field === 'settings') {
      const { name, value } = input;
      const settings = { ...progress.settings, [name]: name === 'voice' ? value : input.valueAsNumber };
      progress.settings = store.sanitize({ settings }).settings;
      input.value = progress.settings[name];
      save();
    }
  });

  view.addEventListener('keydown', (event) => {
    if (!session?.root || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
    if (event.key === 'Enter' && (session.answered || event.repeat)) {
      event.preventDefault();
      if (!event.repeat) nextQuestion();
    } else if (/^[1-4]$/.test(event.key) && ['trac-nghiem', 'nghe'].includes(session.questionMode)) {
      const index = Number(event.key) - 1;
      const option = session.question.querySelector('[data-choice="' + index + '"]');
      if (!event.repeat && option && !option.disabled) {
        event.preventDefault();
        choose(option);
      }
    } else if (event.key === ' ' && session.questionMode === 'the' &&
        (event.target === view || event.target === field(session.question, 'card'))) {
      event.preventDefault();
      if (!event.repeat) flip(field(session.question, 'card'));
    }
  });

  synthesis?.addEventListener('voiceschanged', () => {
    syncSpeech();
    const form = field(view, 'settings');
    if (form) fillVoices(form);
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('pagehide', leaveSpeaking);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && location.hash.startsWith('#/noi/')) route();
  });
  route();
})();
