import defaultParsers from "./parsers.js";
import defaultConfig from "./config.js";
import { mergeDeep, embedMarkups } from "./utitlities.js";

export default class edjsParser {
    constructor(config = {}, customs = {}, embeds = {}) {
        this.config = mergeDeep(defaultConfig, config);
        this.config.embedMarkups = Object.assign(embedMarkups, embeds);
        this.parsers = Object.assign(defaultParsers, customs);
    }

    parse(EditorJsObject) {
        const html = EditorJsObject.blocks.map((block) => {
            const markup = this.parseBlock(block);
            if (markup instanceof Error) {
                return ""; // parser for this kind of block doesn't exist
            }
            return markup;
        });
        return html.join("");
    }

}