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
        "time": 1674849838500,
        "blocks": [
            {
                "id": "R8fWhGtl2s",
                "type": "table",
                "data": {
                    "withHeadings": true,
                    "content": [
                        [
                            "dvbdc",
                            "cvbc",
                            "cvb"
                        ],
                        [
                            "cvb",
                            "cvb",
                            "cvb"
                        ]
                    ]
                }
            }
        ],
        "version": "2.26.4"
    }))
})
server.listen(port, () => console.log(`Listening on port ${port}`))
