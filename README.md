# URL-Shortener
這是一個簡易短網址服務，使用 [Node.js](https://nodejs.org/en/)、[Express](https://expressjs.com/)、[mongodb](https://www.mongodb.com/)

![scrrenshot](https://github.com/JessieMosbi/url-shortener/blob/master/screenshot.png?raw=true)

## Requirement
[Node.js](https://nodejs.org/en/)   
[mongodb](https://www.mongodb.com/)

## Packages
此專案用到以下 JS library，可藉由 `npm install` 指令去安裝（請參考底下 Installing 步驟）   
[express](https://expressjs.com/)   
[express-handlebars](https://www.npmjs.com/package/express-handlebars)   
[body-parser](https://www.npmjs.com/package/body-parser)   
[mongoose](https://mongoosejs.com/)   

***

## Installing
開啟終端機 (Terminal)，透過 `git clone` 指令將專案下載下來到本機端
```console
git clone https://github.com/JessieMosbi/url-shortener
```

進入 url-shortener 資料夾內，並檢查是否有 package.json 檔案
```console
cd url-shortener
```

執行 `npm install`，將專案所需套件下載下來
```console
npm install
```

## Executing
請在 mongodb 底下新增 shorten-url 資料庫   
進到存放 mongodb 指令的 bin 資料夾，啟動 mongodb

下方範例的 mongodb 資料夾為根目錄底下的 mongodb/，存放資料庫紀錄的資料夾為根目錄底下的 mongodb-data/   
(opt) localhost 的 ip 為 127.0.0.1，此行不加也可以，只是會有 WARNING 提醒
```console
cd ~/mongodb/bin
./mongod --dbpath ~/mongodb-data --bind_ip 127.0.0.1
```

最後用專案所設定的統一指令，即可執行專案
```console
npm run dev
```

預設 port 為 3000，請直接打開瀏覽器，並在 URL 輸入 http://localhost:3000/ 即可瀏覽網頁
