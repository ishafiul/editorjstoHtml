"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    image: {
        use: "figure",
        imgClass: "img",
        figureClass: "fig-img",
        figCapClass: "fig-cap",
        path: "absolute",
    },
    paragraph: {
        pClass: "paragraph",
    },
    code: {
        codeBlockClass: "code-block",
    },
    embed: {
        useProvidedLength: true,
        // set to true if you want the returned width and height of editorjs to be applied
        // NOTE: sometimes source site overrides the lengths so it does not work 100%
    },
    quote: {
        applyAlignment: false,
        // if set to true blockquote element will have text-align css property set
    },
};
//# sourceMappingURL=config.js.map