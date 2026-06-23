без папки node_modules

запуск:

терминал 1:
npm install
npm run dev

терминал 2:
node index.js


не запускался локал хост, пока не изменил строчку dev в package.json, теперь выглядит так:
  "scripts": {
    "start": "nodemon index.js",
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "vite build",
    "preview": "vite preview"
  }, (на всякий случай)
