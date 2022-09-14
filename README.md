# TRB-Account

整合Firebase Auth和PhotoCrop功能，並建立簡單的Profile畫面

## Feature 說明

1. 透過Firebase Auth實作登入畫面
2. 登入成功後，導入到Profile畫面
3. 點選Profile裡的頭像照片進行頭像編輯
4. 頭像編輯成功後，返回Profile，並顯示剛更新的頭像

---

### 1.透過Firebase Auth實作登入畫面

Routing 格式 https://localhost/login

登入功能：
- Google登入
- Apple登入
- 電話登入
- 匿名登入 (option)


### 2.登入成功後，導入到Profile畫面

Routing 格式 https://localhost/profile

顯示資料：
- uid
- provider
- email (option)
- phoneNumber (option)
- person photo (https://toysrbooks.com/dev/v0.1/photo/:uid.png)
設定 placeholder、Rounded Image

![](https://i.imgur.com/xudwN5o.png)


---
### 3.點選Profile裡的頭像照片進行頭像編輯

Routing 格式 https://localhost/crop/:uid

uploadPhotoData.php 上傳更新照片
- POST Parameters

| 欄位名稱 | 輸入格式 | 說明 |
| -- | -- | -- |
| token | String | apiToken |
| user_id | String | 會員編號(uid) |
| personal_photo | String(file Base64) | 個人照片檔案(尚未mask) |
| face_photo | String(file Base64) | 臉部照片檔案 |


---
### 4.頭像編輯成功後，返回Profile，並顯示剛更新的頭像

顯示personal_photo頭像
