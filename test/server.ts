import express from "express";
import {createServer} from "http";
import EditorJsToHtml from "../dist/cjs";
const app = express()
const ejs = new EditorJsToHtml();
const server = createServer(app);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.sendFile('index.html', {root: app.get('views')}))
app.get('/perse', async (req, res) => {

    res.send(ejs.parse({
        "time": 1674775249942,
        "blocks": [
            {
                "id": "5dHkK2vsft",
                "type": "code",
                "data": {
                    "code": ".ce-code__textarea {\n    min-height: 200px;\n    font-family: Menlo, Monaco, Consolas, Courier New, monospace;\n    color: #41314e;\n    line-height: 1.6em;\n    font-size: 12px;\n    background: #f8f7fa;\n    border: 1px solid #f1f1f4;\n    box-shadow: none;\n    white-space: pre;\n    word-wrap: normal;\n    overflow-x: auto;\n    resize: vertical;\n}"
                }
            },
            {
                "type": "image",
                "data": {
                    "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
                    "caption": "Roadster // tesla.com",
                    "withBorder": false,
                    "withBackground": false,
                    "stretched": true
                }
            },
        ],
        "version": "2.26.4"
    }))
})
server.listen(port, () => console.log(`Listening on port ${port}`))
