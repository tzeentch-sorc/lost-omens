# Steps to use ngrok

## Get token
1. Sign up [here](https://ngrok.com) and follow steps provided
2. In dashboard go to "Your Authtoken" and get your secret authtoken

## Setup ngrok
1. install ngrok `npm install -g ngrok`
2. configure token `ngrok config add-authtoken <your_secret_authtoken>`
3. `set HTTPS=true` - without does NOT work

## Run ngrok
1. Run `ngrok http https://localhost:10888`
2. Go to `http://127.0.0.1:4040` and get there your dev link
3. Paste dev link to your test group

> Additionally, you can check the provided link - it should show the same page as `https://localhost:10888`
> Moreover, if you need that, you can see all requests to your dev link on `http://127.0.0.1:4040`