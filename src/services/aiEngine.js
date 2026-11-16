export function askAiMentor({ prompt, currentCode = '', codeError = null }) {
  const q = (prompt || '').toLowerCase();

  if (q.includes('quick')) {
    return {
      reply:
        "Quick Sort — 'Bo'lib tashla va hukmronlik qil' tamoyiliga asoslangan tezkor saralash:\n1. Massiv oxiridan tayanch element (pivot) tanlanadi.\n2. Pivotdan kichik elementlar chapga, kattalari o'ngga o'tkaziladi.\n3. Chap va o'ng qismlar rekursiv ravishda saralanadi.\n\nO'rtacha vaqt murakkabligi: O(n log n).",
      suggestedCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
    };
  }

  if (q.includes('insertion')) {
    return {
      reply:
        "Insertion Sort — karta o'yinida kartalarni qo'lda tartiblashga o'xshaydi:\n1. Ikkinchi elementdan boshlab har bir element chap tomondagi saralangan qism bilan solishtiriladi.\n2. O'zidan katta elementlar o'ngga surilib, mos joyiga joylashtiriladi.",
      suggestedCode: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
    };
  }

  if (q.includes('binary')) {
    return {
      reply:
        "Binary Search — saralangan massivda elementni har qadamda qidiruv maydonini ikkiga bo'lish orqali O(log n) vaqtda topadi.",
      suggestedCode: `function binarySearch(arr, target = arr[arr.length - 1]) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`
    };
  }

  if (q.includes('xato') || q.includes('tuzat') || q.includes('bug') || codeError) {
    if (currentCode.includes('buggyBubbleSort') || currentCode.includes('j < n; j++')) {
      return {
        reply:
          "Kodingizda 2 ta mantiqiy xato topildi:\n1. Ichki siklda chegara 'j < n' emas, 'j < n - i - 1' bo'lishi kerak (aks holda massiv chegarasidan chiqib ketadi).\n2. O'sish tartibi uchun 'arr[j] < arr[j + 1]' emas, 'arr[j] > arr[j + 1]' sharti yoziladi.",
        suggestedCode: `function fixedBubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
      };
    }

    if (codeError) {
      return {
        reply: `Aniqlangan xato: ${codeError}\n\nKodda kamida bitta 'function nomi(arr)' e'lon qilinganiga va sikl shartlari to'g'ri tugashiga ishonch hosil qiling.`
      };
    }

    return {
      reply:
        "Kodingiz sintaksis jihatdan toza ko'rinmoqda. 'Tahlil' tugmasini bosib, 3D ustunlarda natijani tekshirishingiz mumkin."
    };
  }

  const loopCount = (currentCode.match(/\b(for|while)\b/g) || []).length;
  const hasSwap = /temp|\[arr\[/.test(currentCode);
  const fnMatch = currentCode.match(/function\s+([a-zA-Z0-9_$]+)/);
  const fnName = fnMatch ? fnMatch[1] : 'algoritm';

  return {
    reply:
      `Bosqichma-bosqich tahlil (${fnName}):\n` +
      `1. Tuzilma: Kodda ${loopCount} ta takrorlanish sikli aniqlandi.\n` +
      `2. Elementlar harakati: ${hasSwap ? "Massiv elementlari o'zaro joy almashadi (in-place)." : "Elementlar o'qish/tekshirish rejimida ishlaydi."}\n` +
      `3. Samaradorlik: ${loopCount >= 2 ? "Ichma-ich sikl sababli o'rtacha vaqt O(n²)." : "Chiziqli yoki logarifmik samaradorlikka ega."}`
  };
}

export function getInterviewScenarios() {
  return [
    {
      id: 'google-sort',
      company: 'Google',
      role: 'Frontend / Algorithms Engineer',
      topic: 'Saralash va Vaqt Murakkabligi',
      question:
        "1 millionta foydalanuvchi yozuvini saralash kerak. Nima uchun Bubble Sort o'rniga Quick Sort yoki Merge Sort tanlanadi?",
      followUpQuestion:
        "2-bosqich savol: Agar massiv deyarli saralangan holatda bo'lsa, Quick Sort ning eng yomon holati O(n²) ga tushib qolmasligi uchun pivotni qanday tanlaysiz?",
      hints: ['O(n²) vs O(n log n)', 'Random / Median-of-three pivot', 'Xotira sarfi (Space Complexity)'],
      keywords: ['log', 'n^2', 'n²', 'tez', 'pivot', 'merge', 'xotira', 'o(1)', 'o(n'],
      followUpKeywords: ['random', 'tasodifiy', 'median', 'o\'rta', 'shuffle', 'aralashtir', 'worst', 'pivot']
    },
    {
      id: 'amazon-graph',
      company: 'Amazon',
      role: 'Software Development Engineer',
      topic: 'Graflar va Eng Qisqa Yo‘l',
      question:
        "Yetkazib berish tarmog'ida eng qisqa masofani topish uchun BFS va Dijkstra algoritmlarining asosiy farqi nimada?",
      followUpQuestion:
        "2-bosqich savol: Agar yo'llarda manfiy vaznlar (masalan, chegirma yoki bonus ballar) bo'lsa, Dijkstra ishlaydimi yoki qaysi algoritmga o'tasiz?",
      hints: ['Vaznsiz vs vaznli qirralar', 'Bellman-Ford algoritmi', 'Manfiy sikllar'],
      keywords: ['vazn', 'weight', 'navbat', 'queue', 'qisqa', 'masofa', 'bfs', 'dijkstra'],
      followUpKeywords: ['bellman', 'ford', 'manfiy', 'negative', 'ishlamaydi', 'sikl', 'cycle']
    },
    {
      id: 'meta-search',
      company: 'Meta',
      role: 'Software Engineer',
      topic: 'Qidiruv va Ma’lumotlar Tuzilmasi',
      question:
        "Binary Search ishlashi uchun asosiy shart nima va nima uchun har qadamda O(log n) vaqt ketadi?",
      followUpQuestion:
        "2-bosqich savol: Katta sonlarda `(left + right) / 2` o'rniga `left + Math.floor((right - left) / 2)` yozilishining sababi nimada?",
      hints: ['Saralangan massiv', 'Integer overflow oldini olish', 'Ikkiga bo‘lish (mid)'],
      keywords: ['saralangan', 'sorted', 'ikki', 'yarim', 'mid', 'log', 'o(log'],
      followUpKeywords: ['overflow', 'toshib', 'katta', 'chegara', 'xavfsiz', 'int', 'bit']
    }
  ];
}

export function evaluateInterviewAnswer({ scenario, answerText, stage = 1 }) {
  const clean = (answerText || '').toLowerCase().trim();
  const words = clean.split(/\s+/).filter(Boolean);

  const activeKeywords = stage === 2 ? scenario.followUpKeywords : scenario.keywords;
  const matchedList = (activeKeywords || []).filter((kw) => clean.includes(kw));
  const missingList = (activeKeywords || []).filter((kw) => !clean.includes(kw)).slice(0, 3);

  const lengthBonus = Math.min(25, words.length * 2.5);
  const keywordScore = Math.min(75, matchedList.length * 22 + 25);
  const score = Math.min(100, Math.max(45, Math.round(keywordScore + lengthBonus)));

  const strengthsText =
    matchedList.length > 0
      ? `Kuchli tomonlar: "${matchedList.join(', ')}" kabi muhim tushunchalarni to'g'ri qo'lladingiz.`
      : "Kuchli tomonlar: Fikringizni mantiqiy ketma-ketlikda bayon qildingiz.";

  const improveText =
    missingList.length > 0
      ? `Tavsiya: Javobda "${missingList.join(', ')}" atamalariga ham to'xtalsangiz tahlil yanada mukammal chiqadi.`
      : "Tavsiya: Texnik atamalar va murakkablik tahlili a'lo darajada!";

  if (stage === 1) {
    return {
      score,
      feedback: `${strengthsText}\n${improveText}`,
      followUp: scenario.followUpQuestion,
      isFinal: false
    };
  }

  const verdict =
    score >= 82
      ? "Strong Hire (A'lo daraja)"
      : score >= 65
      ? "Hire (Yaxshi tayyorgarlik)"
      : "Practice More (Qo'shimcha mashq tavsiya etiladi)";

  return {
    score,
    feedback: `${strengthsText}\n${improveText}\n\nYakuniy Suhbat Xulosasi: ${verdict}`,
    followUp: "Ushbu kompaniya ssenariysi yakunlandi. Yuqoridan boshqa kompaniyani tanlab davom etishingiz mumkin.",
    isFinal: true
  };
}