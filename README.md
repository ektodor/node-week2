# 助教修改建議

- [x] 修改或刪除單筆資料時，若使用者傳入不存在的 ObjectId 且使用的是 findByIdAndUpdate 或 findOneAndUpdate，mongoose 預設會回傳 null 並回傳修改 or 刪除成功，可以再針對此情況自訂錯誤訊息
- [x] 由於最終作業是一個臉書動態牆，不能有新增空白內容的情況，因此建議 PATCH 這裡加上一個 data.content 是否為空的判斷，或者可以在 findByIdAndUpdate 加入第三個參數 { runValidators: true }，讓 findByIdAndUpdate 也可以跑 Schema 驗證規則，可以[參考這篇文章](https://israynotarray.com/nodejs/20220301/1465076357/#google_vignette)哦
