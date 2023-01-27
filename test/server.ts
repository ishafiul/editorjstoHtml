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
        "time": 1674852520718,
        "blocks": [
            {
                "id": "wN_FK1kY-C",
                "type": "table",
                "data": {
                    "withHeadings": true,
                    "content": [
                        [
                            "sdfsd",
                            "dfg",
                            "sdf",
                            "sdfs"
                        ],
                        [
                            "sdfs",
                            "sdf",
                            "sdf",
                            "sdf"
                        ],
                        [
                            "sdf",
                            "sdf",
                            "sdf",
                            "sdf"
                        ]
                    ]
                }
            }
        ],
        "version": "2.26.4"
    }))
})
server.listen(port, () => console.log(`Listening on port ${port}`))
