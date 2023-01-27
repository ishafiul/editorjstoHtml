"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utitlities_1 = require("./utitlities");
const hljs = require('highlight.js/lib/common');
exports.default = {
    paragraph: function (data, config) {
        return `<p class="${config.paragraph.pClass}"> ${data.text} </p>`;
    },
    header: function (data) {
        return `<h${data.level}>${data.text}</h${data.level}>`;
    },
    list: function (data) {
        const type = data.style === "ordered" ? "ol" : "ul";
        return (0, utitlities_1.listBuilder)(data, type);
    },
    quote: function (data, config) {
        let alignment = "";
        if (config.quote.applyAlignment) {
            alignment = `style="text-align: ${data.alignment};"`;
        }
        return `<blockquote ${alignment}><p>${data.text}</p><cite>${data.caption}</cite></blockquote>`;
    },
    table: function (data) {
        if (data.withHeadings) {
            let headtds = '';
            data.content[0].forEach((head) => {
                headtds += `<th>${head}</th>`;
            });
            const thead = `<thead>${headtds}</thead>`;
            let bodytrs = '';
            for (let i = 1; i < data.content.length; i++) {
                let bodytds = '';
                data.content[i].forEach((col) => {
                    bodytds += `<td>${col}</td>`;
                });
                bodytrs += `<tr>${bodytds}</tr>`;
            }
            const tbody = `<tbody>${bodytrs}</tbody>`;
            return `<table>${thead}${tbody}</table>`;
        }
        else {
            const rows = data.content.map((row) => {
                return `<tr>${row.reduce((acc, cell) => acc + `<td>${cell}</td>`, "")}</tr>`;
            });
            return `<table><tbody>${rows.join("")}</tbody></table>`;
        }
    },
    image: function (data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${data.withBorder ? "img-border" : ""} ${data.withBackground ? "img-bg" : ""}`;
            const imgClass = config.image.imgClass || "";
            let imageSrc;
            if (data.url) {
                // simple-image was used and the image probably is not uploaded to this server
                // therefore, we use the absolute path provided in data.url
                // so, config.image.path property is useless in this case!
                imageSrc = data.url;
            }
            else if (config.image.path === "absolute") {
                imageSrc = data.file.url;
            }
            else {
                imageSrc = config.image.path.replace(/<(.+)>/, (match, p1) => data.file[p1]);
            }
            if (config.image.use === "img") {
                return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}" `;
            }
            else if (config.image.use === "figure") {
                const figureClass = config.image.figureClass || "";
                const figCapClass = config.image.figCapClass || "";
                return `<figure class="${figureClass}"><img  class="${imgClass} ${imageConditions}" src="${imageSrc}" alt="${data.caption}"><figcaption class="${figCapClass}">${data.caption}</figcaption></figure>`;
            }
        });
    },
    code: function (data, config) {
        const markup = (0, utitlities_1.sanitizeHtml)(data.code);
        const code = hljs.highlightAuto(markup);
        return `<pre><code>${code.value.toString()}</code></pre>`;
    },
    raw: function (data) {
        return data.html;
    },
    delimiter: function (data) {
        return "<br />";
    },
    embed: function (data, config) {
        if (config.embed.useProvidedLength) {
            data.length = `width="${data.width}" height="${data.height}"`;
        }
        else {
            data.length = "";
        }
        const regex = new RegExp(/<%data\.(.+?)%>/, "gm");
        if (config.embedMarkups[data.service]) {
            return config.embedMarkups[data.service].replace(regex, (match, p1) => data[p1]);
        }
        else {
            return config.embedMarkups["defaultMarkup"].replace(regex, (match, p1) => data[p1]);
        }
    },
    checklist: function (data, config) {
        let html = '';
        data.items.forEach((item) => {
            html += `
            <div>
                <input disabled type="checkbox" ${item.checked ? 'checked' : ''}>
                <label > ${item.text}</label><br>
</div>
            `;
        });
        return html;
    }
};
//# sourceMappingURL=parsers.js.map