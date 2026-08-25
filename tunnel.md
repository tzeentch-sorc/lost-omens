# Running the app inside VK

To open the app inside VK you need a public HTTPS address that VK can load in an
iframe. This document describes how to get one.

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

## Option A — the shared tunnel at `dev.geekmo.ru`

The everyday path. Keeps hot reload: you edit a file and everyone in the test group
sees the change without a redeploy.

There is a small VPS with a Russian IP running Caddy. It terminates TLS for
`dev.geekmo.ru` and forwards everything to whichever developer currently has a tunnel
open. `https://dev.geekmo.ru` is already set as the development address in the app
settings, so nobody has to touch them.

```
your machine                     dev.geekmo.ru
┌──────────────────────┐         ┌────────────────────────────────┐
│ react-scripts start  │         │  Caddy :443                    │
│ https://localhost:   │◀────────│    ↓ reverse_proxy             │      VK
│              10888   │  ssh -R │  127.0.0.1:10888 ◀── tunnel    │◀── webview
└──────────────────────┘         └────────────────────────────────┘
                                   Let's Encrypt, renewed by Caddy
```

### One-time setup

Generate a key, if you do not already have one you want to use:

```bash
ssh-keygen -t ed25519 -C "geekmo-tunnel"
```

Send the **public** half — the `.pub` file — to the server owner and ask for access.
Never send the private one.

The key you get access with can do exactly one thing: forward port 10888. No shell,
no agent forwarding, nothing else. See "For the server owner" below.

Add an entry to `~/.ssh/config`, substituting your key path and the username you were
given:

```
Host geekmo-tunnel
    HostName dev.geekmo.ru
    User geekk0
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

The alias matters. If you write `user@dev.geekmo.ru` directly, the config does not
apply, `ssh` looks for `id_ed25519` by default and asks for a password that does not
exist.

### Daily use

Two terminals. Dev server:

```bash
npx cross-env PORT=10888 HTTPS=true WDS_SOCKET_PORT=443 react-scripts start
```

Tunnel:

```bash
ssh -N -R 10888:127.0.0.1:10888 geekmo-tunnel
```

Then open `vk.com/app51758531`. Edits arrive without a page reload.

`ssh -N` prints nothing while it holds the connection — silence means it is working.

**The forward target must be `127.0.0.1`, not `localhost`.** That address is resolved
on your side, and on Windows `localhost` resolves to `::1` while the CRA dev server
listens on IPv4 only (`0.0.0.0:10888`). With `localhost` the tunnel comes up and the
server honestly shows a listening `sshd`, but every connection is refused at the far
end: Caddy returns 502 and the ssh window stays silent, because as far as `ssh` is
concerned the channel is fine.

### One person at a time

The app has a single development address, so only one tunnel can be useful at any
moment anyway. The port reflects that: if someone else is already connected, your
`ssh` exits with an error instead of connecting. Add `-o ExitOnForwardFailure=yes` if
you want to be certain it never fails silently.

If the port is stuck because someone forgot to close their tunnel, ask in the chat —
a contributor key deliberately has no shell, so there is no way to look.

While no tunnel is up, `dev.geekmo.ru` returns 502. That is intended: the dev build is
reachable only while someone is actually working.

### For the server owner

Adding a contributor is one line in `authorized_keys` of the tunnel user:

```
restrict,port-forwarding,permitlisten="127.0.0.1:10888" ssh-ed25519 AAAA... contributor-name
```

`restrict` disables everything — shell, PTY, agent and X11 forwarding — and
`port-forwarding` re-enables only forwarding. `permitlisten` pins the key to that one
port, so a contributor cannot bind anything else, even by accident.

Removing access is deleting the line.

## Option B — dev deploy to VK Hosting

No infrastructure, no coordination, no dependency on anyone else's server.

```bash
npm run deploy
```

`vk-miniapps-deploy` understands the `MINI_APPS_ENVIRONMENT` variable with values
`production` and `dev`, and offers to update the production address, the dev address
and the test group address. Files are served by VK Hosting.

Cost: a minute or two per cycle and no hot reload.

Use this when the shared tunnel is occupied or unreachable, or when you would rather
not depend on it. It is the path that always works, and it is worth keeping in mind
that the shared server is a convenience, not a requirement.

## Option C — your own server

If you want a tunnel independent of the shared one, the setup is small: any VPS with
a **Russian IP** (the address must open from a Russian network, or VK will not load
it), a domain with an A record pointing at it, and [Caddy](https://caddyserver.com/),
which obtains and renews Let's Encrypt certificates on its own and proxies WebSocket
without extra configuration — which is what hot reload needs.

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
nothing to verify anyway. Port 80 must stay open — Let's Encrypt uses it to verify
domain ownership.

The client side is identical to Option A. Note that switching to your own address
means editing the development address in the app settings — **all three endpoints**
(web, mobile, mvk) — which affects everyone else, so coordinate first.

## Troubleshooting

| Symptom | Cause |
|---|---|
| 502 from Caddy | no tunnel is up, the dev server is not running, or the forward points at `localhost` instead of `127.0.0.1` |
| `ssh` exits immediately on connect | someone else already holds the port |
| Endless spinner inside VK | the address serves an interstitial page, or VK did not pick up a changed address |
| Page loads, edits do not arrive | the hot reload socket did not connect — check `WDS_SOCKET_PORT` |
| Blank screen inside VK | the address was set for only some of the three endpoints |
| Certificate is not issued (own server) | the A record has not propagated yet, or port 80 is closed |

Inside the mobile webview use the `eruda` console — it is loaded in dev mode, see
`src/eruda.js`.

## A note on security

While a tunnel is up, the dev build is publicly reachable at a permanent address, and
`config.json` is imported statically, so everything in it ends up in the bundle. Keep
the tunnel open only while you work.
