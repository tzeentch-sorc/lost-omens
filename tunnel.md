# Running the app inside VK

To open the app inside VK you need a public HTTPS address that VK can load in an
iframe. This document describes the two ways that work.

## Why not `npm run tunnel`

**VK Tunnel is switched off on VK's side.** The README of
[`VKCOM/vk-tunnel-client`](https://github.com/VKCOM/vk-tunnel-client) says the service
has been unavailable since 2 October 2025 due to maintenance, with no end date
announced. Connecting returns an error. The `tunnel` script in `package.json` is kept
only so that it starts working again by itself if VK ever brings the service back.

**ngrok is not an option either.** It is not reachable from a Russian network, and a
Russian exit is a hard requirement here: without it VK itself does not open, so there
is nothing to test against.

The same caveat applies to free tunnel services in general. Many of them show an
interstitial "are you sure you want to visit this site" page before the actual
content. In a normal browser you click through it once; inside the VK iframe
third-party cookies are blocked, the "show once" flag never sticks, and VK spins
forever instead of loading the app.

## Option A — dev deploy to VK Hosting

The simplest path. No infrastructure, nothing exposed from your machine.

```bash
npm run deploy
```

`vk-miniapps-deploy` understands the `MINI_APPS_ENVIRONMENT` variable with values
`production` and `dev`, and offers to update the production address, the dev address
and the test group address. Files are served by VK Hosting.

Cost: a minute or two per cycle and no hot reload. Good as a fallback and for
checking something once; painful as your main loop.

## Option B — self-hosted reverse tunnel

Keeps hot reload: you edit a file and everyone in the test group sees the change
without a redeploy. Needs a server.

```
your machine                     VPS with a Russian IP
┌──────────────────────┐         ┌────────────────────────────────┐
│ react-scripts start  │         │  Caddy :443                    │
│ https://localhost:   │◀────────│    ↓ reverse_proxy             │      VK
│              10888   │  ssh -R │  127.0.0.1:10888 ◀── tunnel    │◀── webview
└──────────────────────┘         └────────────────────────────────┘
                                   your.domain, Let's Encrypt
```

### What you need

- a VPS with a **Russian IP** — the address must open from a Russian network, or VK
  will not load it. The cheapest plan is enough: the server only runs a reverse proxy
- a domain with an A record pointing at the server
- [Caddy](https://caddyserver.com/) on the server — it obtains and renews Let's
  Encrypt certificates on its own, and proxies WebSocket without extra configuration,
  which is what hot reload needs

### Server side

`/etc/caddy/Caddyfile`:

```
dev.your.domain {
	reverse_proxy https://127.0.0.1:10888 {
		transport http {
			tls_insecure_skip_verify
		}
	}
}
```

`tls_insecure_skip_verify` is needed because the CRA dev server uses a self-signed
certificate; the connection runs over the server's loopback interface, so there is
nothing to verify anyway.

Port 80 must stay open — Let's Encrypt uses it to verify domain ownership.

### Your side

Dev server:

```bash
npx cross-env PORT=10888 HTTPS=true WDS_SOCKET_PORT=443 react-scripts start
```

`WDS_SOCKET_PORT=443` makes the hot reload socket address explicit behind the TLS
terminator.

Tunnel, in a second terminal:

```bash
ssh -N -R 10888:127.0.0.1:10888 user@dev.your.domain
```

**The forward target must be `127.0.0.1`, not `localhost`.** That address is resolved
on your side, and on Windows `localhost` resolves to `::1` while the CRA dev server
listens on IPv4 only (`0.0.0.0:10888`). With `localhost` the tunnel comes up and
`ss -tlnp` on the server honestly shows a listening `sshd`, but every connection is
refused at the far end: Caddy returns 502 and the ssh window stays silent, because as
far as `ssh` is concerned the channel is fine.

### VK settings

Put `https://dev.your.domain` into the development address fields of the app
settings — **all three endpoints** (web, mobile, mvk). With a permanent domain this is
done once and never again, unlike VK Tunnel which handed out a new name on every
start.

While the tunnel is down the domain returns 502. That is the intended behaviour: the
dev build is reachable only while you are actually working.

## Troubleshooting

| Symptom | Cause |
|---|---|
| 502 from Caddy | tunnel not up, dev server not running, or the forward points at `localhost` instead of `127.0.0.1` |
| Endless spinner inside VK | the address serves an interstitial page, or VK did not pick up the new address |
| Page loads, edits do not arrive | the hot reload socket did not connect — check `WDS_SOCKET_PORT` |
| Certificate is not issued | the A record has not propagated yet, or port 80 is closed |
| Blank screen inside VK | the address was set for only some of the three endpoints |

Inside the mobile webview use the `eruda` console — it is loaded in dev mode, see
`src/eruda.js`.

## A note on security

The dev build is publicly reachable at a permanent address while the tunnel is up,
and `config.json` is imported statically, so everything in it ends up in the bundle.
Keep the tunnel running only while you work.
