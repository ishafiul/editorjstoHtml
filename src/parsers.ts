import {listBuilder, sanitizeHtml} from "./utitlities";
const hljs = require('highlight.js/lib/common');
export default {
    paragraph: function(data:any, config:any) {
        return `<p class="${config.paragraph.pClass}"> ${data.text} </p>`;
    },

    header: function(data:any) {
        return `<h${data.level}>${data.text}</h${data.level}>`;
    },

    list: function(data:any) {
        const type = data.style === "ordered" ? "ol" : "ul";
        return listBuilder(data,type);
    },

    quote: function(data:any, config:any) {
        let alignment = "";
        if (config.quote.applyAlignment) {
            alignment = `style="text-align: ${data.alignment};"`;
        }
        return `<blockquote ${alignment}><p>${data.text}</p><cite>${data.caption}</cite></blockquote>`;
    },

    table: function(data:any) {
        if(data.withHeadings){
            let headtds = ''

            data.content[0].forEach((head:string)=>{
                headtds +=`<th>${head}</th>`
            })
            const thead = `<thead>${headtds}</thead>`
            let bodytds =''
            for (let i = 1;i<data.content.length;i++){
                bodytds += `<td>${data.content[0]}</td>`
            }
            const tbody = `<tbody>${bodytds}</tbody>`
            return `<table>${thead}${tbody}</table>`;
        }else {
            const rows = data.content.map((row:any) => {
                return `<tr>${row.reduce(
                    (acc:any, cell:any) => acc + `<td>${cell}</td>`,
                    ""
                )}</tr>`;
            });
            return `<table><tbody>${rows.join("")}</tbody></table>`;
        }
    },
    image: async function (data:any, config:any) {
        const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${
            data.withBorder ? "img-border" : ""
        } ${data.withBackground ? "img-bg" : ""}`;
        const imgClass = config.image.imgClass || "";
        let imageSrc;

        if (data.url) {
            // simple-image was used and the image probably is not uploaded to this server
            // therefore, we use the absolute path provided in data.url
            // so, config.image.path property is useless in this case!
            imageSrc = data.url;
        } else if (config.image.path === "absolute") {
            imageSrc = data.file.url;
        } else {
            imageSrc = config.image.path.replace(
                /<(.+)>/,
                (match:any, p1:any) => data.file[p1]
            );
        }

        if (config.image.use === "img") {
            return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}" `;
        } else if (config.image.use === "figure") {
            const figureClass = config.image.figureClass || "";
            const figCapClass = config.image.figCapClass || "";

            return `<figure class="${figureClass}"><img  class="${imgClass} ${imageConditions}" src="${imageSrc}" alt="${data.caption}"><figcaption class="${figCapClass}">${data.caption}</figcaption></figure>`;
        }
    },
    code: function (data:any, config:any) {
        const markup = sanitizeHtml(data.code);
        const code = hljs.highlightAuto(markup)
        return `<pre><code>${code.value.toString()}</code></pre>`;
    },
    raw: function (data:any) {
        return data.html;
    },
    delimiter: function (data:any) {
        return "<br />";
    },

    embed: function (data:any, config:any) {
        if (config.embed.useProvidedLength) {
            data.length = `width="${data.width}" height="${data.height}"`;
        } else {
            data.length = "";
        }
        const regex = new RegExp(/<%data\.(.+?)%>/, "gm");
        if (config.embedMarkups[data.service]) {
            return config.embedMarkups[data.service].replace(
                regex,
                (match:any, p1:any) => data[p1]
            );
        } else {
            return config.embedMarkups["defaultMarkup"].replace(
                regex,
                (match:any, p1:any) => data[p1]
            );
        }
    },
    checklist: function (data:any, config:any){
        let html:string =''
        data.items.forEach((item:any)=>{
            html += `
            <div>
                <input disabled type="checkbox" ${item.checked?'checked':''}>
                <label > ${item.text}</label><br>
</div>
            `
        })
        return html
    }
};