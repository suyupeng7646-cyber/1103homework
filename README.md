# 台灣茶小誌

一個可以持續擴充的台灣茶入門網站。以茶款卡片介紹風味、常見產區與沖泡起點，並示範如何讓 AI 遵循專案規則，使用同一套格式繼續新增內容。

## 專案結構

```text
.
├── AGENTS.md      # AI 協作規範與新增內容格式
├── README.md      # 專案介紹與使用方式
├── index.html     # 單頁網站結構
├── styles.css     # 色彩、版面與響應式樣式
└── app.js         # 茶款資料、篩選及詳情對話框
```

## 瀏覽

直接用瀏覽器開啟 `index.html`。本專案沒有外部套件或建置程序，也可以發布到 GitHub Pages。

## 新增茶款

閱讀 `AGENTS.md`，然後在 `app.js` 的 `TEAS` 陣列增加一筆符合資料格式的物件。若使用新分類或新色票，記得同步更新篩選器與 `styles.css`。卡片和詳情內容會由資料自動產生。

## 發布至 GitHub Pages

將整個資料夾推送至 GitHub repository，在 repository 的 **Settings → Pages** 選擇 `Deploy from a branch`、`main` 與 `/ (root)` 儲存，即可取得公開網址。

## 授權與內容

此專案的程式與文字可自由修改作為課堂練習。茶款介紹為一般入門資訊，產地與風味會依品牌、季節與製程而異。
