const TEAS = [
  { id: "high-mountain-oolong", name: "高山烏龍", category: "烏龍茶", origin: "常見於中高海拔茶區，如阿里山、梨山一帶", oxidation: "輕度至中度，依製程而異", flavor: ["清花香", "熟果", "甘甜"], description: "茶湯清亮，常帶著細緻花香與回甘。清爽的個性很適合第一次探索台灣烏龍茶，也適合想讓下午慢下來的時候。", brew: "可先試每 100 ml 水搭配約 3 g 茶葉，以 90–95°C 熱水浸泡約 40 秒；之後依濃淡調整。", color: "moss" },
  { id: "oriental-beauty", name: "東方美人", category: "烏龍茶", origin: "新竹、苗栗等北部丘陵茶區常見", oxidation: "中度至較高，常帶有熟果甜香", flavor: ["蜜香", "熟果", "蜂蜜"], description: "帶有討喜的熟果與蜜甜香氣，茶湯柔和不顯澀。風味辨識度高，適合喜歡香氣豐富、想從茶香開始認識烏龍茶的人。", brew: "可從每 100 ml 水約 3 g 茶葉、85–90°C 熱水開始，浸泡約 45 秒；用較低水溫也能感受香氣變化。", color: "amber" },
  { id: "red-jade", name: "紅玉紅茶", category: "紅茶", origin: "南投魚池一帶常見", oxidation: "全發酵紅茶", flavor: ["薄荷香", "肉桂", "熟果"], description: "以台茶 18 號製成的紅茶常有清楚的辛香與薄荷感，茶色溫暖、滋味飽滿。單喝就很有層次，也適合搭配點心。", brew: "可試每 100 ml 水約 3 g 茶葉，以 90–95°C 熱水浸泡 2–3 分鐘；縮短時間可以讓口感更輕柔。", color: "rust" },
  { id: "four-seasons-spring", name: "四季春", category: "烏龍茶", origin: "台灣中低海拔茶區常見", oxidation: "輕度，依製程而異", flavor: ["梔子花", "清香", "爽口"], description: "香氣明亮、入口輕快，常能感受到清新花香。親切好入口，是日常想喝一杯、又不想花太多時間準備時的好選擇。", brew: "先用每 100 ml 水約 3 g 茶葉、90°C 熱水浸泡約 35 秒；喜歡濃一些，可逐泡增加時間。", color: "sage" },
  { id: "baozhong", name: "文山包種", category: "烏龍茶", origin: "台北文山、坪林一帶具代表性", oxidation: "輕度氧化，常以清香見長", flavor: ["蘭花", "青心", "清甜"], description: "外觀條索自然舒展，香氣常讓人想到蘭花與清新的草木。茶湯清雅、尾韻甘甜，適合喜歡細細聞香、慢慢品飲的人。", brew: "可從每 100 ml 水約 3 g 茶葉與 90°C 熱水開始，浸泡約 40 秒；以玻璃杯也能觀察茶葉舒展。", color: "fern" },
  { id: "honey-black-tea", name: "蜜香紅茶", category: "紅茶", origin: "花蓮、南投等地都有不同風格", oxidation: "全發酵紅茶，蜜香表現依茶款而異", flavor: ["蜂蜜", "熟果", "溫潤"], description: "香氣溫暖圓潤，帶著蜂蜜般的甜香與熟果調性。每個產區和製作者的個性都不同，很適合一邊喝、一邊比較自己的風味筆記。", brew: "試試每 100 ml 水約 3 g 茶葉，以 90°C 熱水浸泡 2 分鐘，再依喜歡的濃度微調。", color: "honey" }
];

const categories = ["全部", ...new Set(TEAS.map(tea => tea.category))];
const filters = document.querySelector("#filters");
const grid = document.querySelector("#tea-grid");
const dialog = document.querySelector("#tea-dialog");
const noResults = document.querySelector("#no-results");
let activeCategory = "全部";
let lastTrigger = null;

function renderFilters() {
  filters.innerHTML = categories.map((category, index) => `<button class="filter-button${index === 0 ? " is-active" : ""}" type="button" aria-pressed="${index === 0}" data-category="${category}">${category}</button>`).join("");
  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll("button").forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderTeas();
  });
}

function renderTeas() {
  const visibleTeas = activeCategory === "全部" ? TEAS : TEAS.filter(tea => tea.category === activeCategory);
  document.querySelector("#result-count").textContent = `${String(visibleTeas.length).padStart(2, "0")} 款茶`;
  noResults.hidden = visibleTeas.length !== 0;
  grid.innerHTML = visibleTeas.map((tea, index) => `
    <article class="tea-card">
      <button class="card-button" type="button" data-tea-id="${tea.id}" aria-label="查看${tea.name}詳情">
        <div class="tea-art tea-art-${tea.color}"><span class="card-number">0${index + 1}</span><span class="tea-glyph" aria-hidden="true">${tea.category === "紅茶" ? "紅" : "烏"}</span><span class="art-lines" aria-hidden="true">〰</span><span class="card-open" aria-hidden="true">↗</span></div>
        <div class="card-meta"><span>${tea.category}</span><span>${tea.flavor.slice(0, 2).join(" · ")}</span></div>
        <h3>${tea.name}</h3><p class="card-description">${tea.description}</p><span class="card-link">翻開這一頁 <span aria-hidden="true">→</span></span>
      </button>
    </article>`).join("");
}

function openTea(tea, trigger) {
  lastTrigger = trigger;
  document.querySelector("#dialog-title").textContent = tea.name;
  document.querySelector("#dialog-category").textContent = `TEA NOTES / ${tea.category}`;
  document.querySelector("#dialog-description").textContent = tea.description;
  document.querySelector("#dialog-origin").textContent = tea.origin;
  document.querySelector("#dialog-oxidation").textContent = tea.oxidation;
  document.querySelector("#dialog-brew").textContent = tea.brew;
  document.querySelector("#dialog-flavors").innerHTML = tea.flavor.map(item => `<span>${item}</span>`).join("");
  document.querySelector("#dialog-art").className = `dialog-art tea-art-${tea.color}`;
  document.querySelector("#dialog-art").innerHTML = `<span class="tea-glyph" aria-hidden="true">${tea.category === "紅茶" ? "紅" : "烏"}</span><span class="art-lines" aria-hidden="true">〰</span>`;
  dialog.showModal();
}

grid.addEventListener("click", event => {
  const button = event.target.closest("button[data-tea-id]");
  if (button) openTea(TEAS.find(tea => tea.id === button.dataset.teaId), button);
});
dialog.addEventListener("close", () => lastTrigger?.focus());

renderFilters();
renderTeas();
