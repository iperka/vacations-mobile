[![Uptime](https://badgen.net/uptime-robot/status/m790176317-818ced6f0430585b9e70c6ab)](https://status.iperka.com)[![Uptime](https://badgen.net/uptime-robot/day/m790176317-818ced6f0430585b9e70c6ab)](https://status.iperka.com)[![Uptime](https://badgen.net/uptime-robot/week/m790176317-818ced6f0430585b9e70c6ab)](https://status.iperka.com)[![Uptime](https://badgen.net/uptime-robot/month/m790176317-818ced6f0430585b9e70c6ab)](https://status.iperka.com)

# 1. Vacations Mobile 📅

Access iperka vacations with the new mobile app. The mobile app has been built using React Native and is currently only available for iOS platforms.

## 1.1. Table of Contents 🧾

- [1. Vacations Mobile 📅](#1-vacations-mobile-)
  - [1.1. Table of Contents 🧾](#11-table-of-contents-)
  - [1.2. Getting Started 🚀](#12-getting-started-)
  - [1.3. Installation 💽](#13-installation-)
  - [1.4. Built With 📦](#14-built-with-)
  - [1.5. Authors 👨‍💻](#15-authors-)
  - [1.6. License 📃](#16-license-)
  - [1.7. Contributing 🤝](#17-contributing-)
  - [1.8. Acknowledgments 🐛](#18-acknowledgments-)
  - [1.9. Environment variables 💻](#19-environment-variables-)

## 1.2. Getting Started 🚀

Clone this repository, adjust the environment variables and start developing by running `yarn ios` in the command line.

## 1.3. Installation 💽

Register for Testflight by clicking the following link: https://testflight.apple.com/join/0NORHyyG

## 1.4. Built With 📦

- [React Native](https://reactnative.dev/) - Cross-Platform Framework
- [Auth0](https://auth0.com/) - Authentication Provider

## 1.5. Authors 👨‍💻

- **Michael Beutler** - _Initial work_ - [MichaelBeutler](https://github.com/MichaelBeutler)

## 1.6. License 📃

[MIT](https://choosealicense.com/licenses/mit/)

## 1.7. Contributing 🤝

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and meet the quality gate requirements.

## 1.8. Acknowledgments 🐛

There is already a Google Script to integrate the Vacations API into your Google Calendar.
See https://github.com/iperka/vacations-google-script

- Ingrate vacations into your calendar.
- Add new workflows to your company.
- Simplify vacations.
- etc...

## 1.9. Environment variables 💻

Please note that some values are hard coded and have to be changed when the main domain changes.

| Name                | Description                                                       | Type     | Default                             |
| ------------------- | ----------------------------------------------------------------- | -------- | ----------------------------------- |
| `AUTH0_AUDIENCE`    | Auth0 Audience configured in your Auth0 API. (Must end with `/`.) | `string` | `https://api.vacations.iperka.com/` |
| `AUTH0_DOMAIN`      | Auth0 Domain provided by Auth0. (Must end with `/`.)              | `string` | `https://iperka.eu.auth0.com/`      |
| `AUTH0_CLIENT_ID`   | Auth0 Client ID for Management API.                               | `string` | `MY_CLIENT_ID`                      |
| `ONE_SIGNAL_APP_ID` | App Id provided by one signal.                                    | `string` | `MY_APP_ID`                         |
