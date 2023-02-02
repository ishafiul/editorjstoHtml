import express from "express";
import {createServer} from "http";
import EditorJsToHtml from "../dist/cjs";
const app = express()
const ejs = new EditorJsToHtml();
const server = createServer(app);
const port = process.env.PORT || 6969;
app.get('/', (req, res) => res.sendFile('index.html', {root: app.get('views')}))
app.get('/perse', async (req, res) => {

    res.send(ejs.parse({
        "time": 1675374584958,
        "blocks": [
            {
                "id": "MIS9TUIrHa",
                "type": "linkTool",
                "data": {
                    "link": "https://www.mindwords.info/post/is-passwordless-authentication-the-future-do-you-really-need-2-factor-authentication",
                    "meta": {
                        "title": "Is Passwordless authentication the future ? Do you really need 2 factor authentication?",
                        "description": "Passwordless authentication is an authentication system where you don't have to verify your identity with a general username or password. Instead, it utilizes email links or OTP, OTP sent via SMS, or biometrics such as...",
                        "image": {
                            "url": "https://www.mindwords.info/api/og?image=https://api.mindwords.xyz/files/uploads/untitled-1-1675342312254.jpg&title=Is Passwordless authentication the future ? Do you really need 2 factor authentication?"
                        }
                    }
                }
            }
        ],
        "version": "2.26.5"
    }))
})
server.listen(port, () => console.log(`Listening on port ${port}`))
