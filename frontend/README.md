#### React client

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### How was this generated?

`npx create-react-app my-app`

This will create a 'my-app' folder, where your app lives.

Uses `npm` to manage packages and tasks.

`npm start` will run the development server at `http://localhost:3000/login`

Initial project structure:
```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js
```

Components are grouped in `/containers`, that handle state and business logic, and `/components`, that are purely presentational. Inside this folders we follow a "group by feature" structure.
