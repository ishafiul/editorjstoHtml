const express = require('express')
const app = express()
const server = require('http').createServer(app);
import edjsParser from "./editorjsToHtml";
const parser = new edjsParser();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.sendFile('index.html',{root:app.get('views')}))
app.use(express.static('editorjsToHtml'))
app.get('/perse', (req, res)=>{

    res.send(parser.parse({
        "time": 1674552295684,
        "blocks": [
            {
                "id": "1jCVZp6zAs",
                "type": "list",
                "data": {
                    "style": "unordered",
                    "items": [
                        {
                            "content": "vnv",
                            "items": [
                                {
                                    "content": "dfgd",
                                    "items": []
                                },
                                {
                                    "content": "sdfsdf",
                                    "items": []
                                },
                                {
                                    "content": "sdfsdf",
                                    "items": [
                                        {
                                            "content": "dfdf",
                                            "items": [
                                                {
                                                    "content": "dfsdfsd",
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        "version": "2.26.4"
    }))
})

server.listen(port, () => console.log(`Listening on port ${port}`))