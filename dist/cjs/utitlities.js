"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBuilder = exports.embedMarkups = exports.sanitizeHtml = exports.mergeDeep = exports.isObject = void 0;
const isObject = function (item) {
    return item && typeof item === "object" && !Array.isArray(item);
};
exports.isObject = isObject;
const mergeDeep = function (target, source) {
    let output = Object.assign({}, target);
    if ((0, exports.isObject)(target) && (0, exports.isObject)(source)) {
        Object.keys(source).forEach((key) => {
            if ((0, exports.isObject)(source[key])) {
                if (!(key in target))
                    Object.assign(output, {
                        [key]: source[key],
                    });
                else
                    output[key] = (0, exports.mergeDeep)(target[key], source[key]);
            }
            else {
                Object.assign(output, {
                    [key]: source[key],
                });
            }
        });
    }
    return output;
};
exports.mergeDeep = mergeDeep;
const sanitizeHtml = function (markup) {
    markup = markup.replace(/&/g, "&amp;");
    markup = markup.replace(/</g, "&lt;");
    markup = markup.replace(/>/g, "&gt;");
    return markup;
};
exports.sanitizeHtml = sanitizeHtml;
exports.embedMarkups = {
    youtube: `<div class="embed"><iframe style="width:100%;" height="320" frameborder="0" allowfullscreen="" src="<%data.embed%>" class="embed-tool__content"></iframe><div><%data.caption%></div>
</div>`,
    twitter: `<blockquote class="twitter-tweet" class="embed-twitter" <%data.length%>><a href="<%data.source%>"></a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    instagram: `<blockquote class="instagram-media" <%data.length%>><a href="<%data.embed%>/captioned"></a></blockquote><script async defer src="//www.instagram.com/embed.js"></script>`,
    codepen: `<div class="embed"><iframe <%data.length%> scrolling="no" src="<%data.embed%>" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
<div><%data.caption%></div>
</div>`,
    defaultMarkup: `<div class="embed">
<iframe scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%; min-height: 500px; max-height: 1000px;" src="<%data.embed%>" class="embed-tool__content"></iframe>
<div><%data.caption%></div>
</div>`,
};
function listBuilder(data, type) {
    let listHtml = '';
    data.items.forEach((item) => {
        listHtml += `<li>${item.content}</li>`;
        if (item.items.length !== 0) {
            listHtml += listBuilder(item, type);
        }
    });
    return `<${type}>${listHtml}</${type}>`;
}
exports.listBuilder = listBuilder;
//# sourceMappingURL=utitlities.js.map