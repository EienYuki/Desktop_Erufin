# 注意！

目前還在開發中，大多數功能尚未完成。

預計在7月15幾號左右，完成基本的功能，像是讀取角色設定檔、自動在關閉時保存狀態、點擊角色更換圖片 播放音效。

# 功能

可以讓你喜歡的角色顯示位於桌面。

- [ ] 鬧鐘功能


## 編譯方式

```sh
npm install
npm run build
```

## 程式說明

程式啓動時，如果沒有找到本專案底下的"resources"，程式會開啓 userData 資料夾，這時請把"resources"複製過去，並重新開起程式。

目前只有在Windows、Mac 上面測試過以下是已知問題

### Windows
在 角色視窗 會失去右鍵選單

### Mac
未發現

## 角色視窗

可以使用 快捷鍵

shift+f1 放大

shift+f2 縮小

shift+f3 角色置頂

shift+f10 儲存設定

shift+f11 開啓資源目錄

shift+f12 控制台

## 畫面截圖

### 角色視窗
![image](https://i.imgur.com/ACOfKr8.png)

### 控制台
![image](https://i.imgur.com/oHJEZ2n.png)

