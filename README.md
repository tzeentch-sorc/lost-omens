# Geekmo VK Mini App

App for checking characters status

- [Geekmo VK Mini App](#geekmo-vk-mini-app)
  - [Dev guide](#dev-guide)
    - [Steps to start development](#steps-to-start-development)
      - [To run](#to-run)
      - [To deploy](#to-deploy)
    - [Codestyle](#codestyle)
    - [Useful links](#useful-links)

## Dev guide

### Steps to start development

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

Then you need to rename file `config.example.json` as `config.json`:

- insert correct access token,
- set IDs for mirror master's google spreadsheets

```JSON
{
    "VKToken": "insert_your_vk_token_here"
}
```

### To run

Locally, without VK:

1. Run `npm start` - dev server on `https://localhost:10888`

When the hostname is `localhost` the app substitutes a mock user from `config.json`
instead of asking VK, so panels render with real spreadsheet data. Anything that
depends on `vk-bridge` - the real VK user, avatars - does not work this way.

To see the app **inside VK** you need a public HTTPS address. See
[tunnel.md](./tunnel.md).

> `npm run tunnel` no longer works: VK Tunnel has been switched off on VK's side
> since 2 October 2025, with no end date announced. The script is kept in case the
> service comes back. [tunnel.md](./tunnel.md) describes what to use instead.

### To deploy

1. Run `npm run deploy` and follow steps in console

### Codestyle

Please, follow below agreement on how to write code and do the bureaucracy.

1. Each commit should contain issue number
2. For each feature create a separate branch (named after YouTrack issue ID e.g. `feature/lost_omens-X`)
3. Do **NOT** commit to *master* branch directly, use only merges

### Useful links

Used below guides to start this project:

- [VK mini app start guide](https://dev.vk.com/ru/mini-apps/getting-started)
- [VK dev guide](https://vk.com/dev)
- [VK toolset](https://dev.vk.com/ru/mini-apps/software-installation)
