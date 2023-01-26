export const isObject = function (item) {
    return item && typeof item === "object" && !Array.isArray(item);
};
export const mergeDeep = function (target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, {
                        [key]: source[key],
                    });
                else
                    output[key] = mergeDeep(target[key], source[key]);
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
export const sanitizeHtml = function (markup) {
    markup = markup.replace(/&/g, "&amp;");
    markup = markup.replace(/</g, "&lt;");
    markup = markup.replace(/>/g, "&gt;");
    return markup;
};
export const embedMarkups = {
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
export function listBuilder(data, type) {
    let listHtml = '';
    data.items.forEach((item) => {
        listHtml += `<li>${item.content}</li>`;
        if (item.items.length !== 0) {
            listHtml += listBuilder(item, type);
        }
    });
    return `<${type}>${listHtml}</${type}>`;
}
//# sourceMappingURL=utitlities.js.map