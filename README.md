# Geekmo VK Mini App

App for checking characters status

- [Geekmo VK Mini App](#geekmo-vk-mini-app)
    - [Dev guide](#dev-guide)
      - [Steps to start development](#steps-to-start-development)
        - [To run](#to-run)
        - [To deploy](#to-deploy)
      - [Codestyle](#codestyle)
      - [Useful links](#useful-links)

### Dev guide

#### Steps to start development

This guide contains only necessary steps from [VK mini app start guide](https://dev.vk.com/ru/mini-apps/getting-started) to build, run and start developing our project from scratch. If you want, you can reference it (above guide is in russian).

Used Toolset:
| Tool | Version |
|---|---|
| NodeJs  | 20.12.2 |
| MS Visual Studio (C++ tools) | 2022 (MSVC v143 latest) | 

1. Install required NodeJs version
2. Install python3
3. Install C++
   More here: ([VK Howto](https://dev.vk.com/ru/mini-apps/software-installation))
4. Clone this repo

##### To run
1. Run `npm start` - to run app locally
2. Run `vk-tunnel --insecure=0 --http-protocol=https --ws-protocol=wss --host=localhost --port=10888 --timeout=5000` - to connect app to VK, in order to get user info
3. Open link which is provided in logs and set it in vk app settings
4. Open `vk.com/app51758531` 

##### To deploy
1. Run `npm run deploy` and follow steps in console

#### Codestyle

Please, follow below agreement on how to write code and do the bureaucracy.

1. Each commit should contain issue number
2. For each feature create a separate branch (named *#<issue_number>-<issue-name>*)
3. Do **NOT** commit to *master* branch directly, use only merges

#### Useful links

Used below guides to start this project:
- [VK mini app start guide](https://dev.vk.com/ru/mini-apps/getting-started)
- [VK dev guide](https://vk.com/dev)
- [VK toolset](https://dev.vk.com/ru/mini-apps/software-installation)