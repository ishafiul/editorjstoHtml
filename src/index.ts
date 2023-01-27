
import defaultParsers from "./parsers";
import defaultConfig from "./config";
import {mergeDeep, embedMarkups} from "./utitlities";
export default class EditorJsToHtml {
    private readonly config: any;
    private readonly parsers: any;
    constructor(config = {}, customs = {}, embeds = {}) {
        this.config = mergeDeep(defaultConfig, config);
        this.config.embedMarkups = Object.assign(embedMarkups, embeds);
        this.parsers = Object.assign(defaultParsers, customs);
    }

    parse(EditorJsObject:any) {
        const html = EditorJsObject.blocks.map((block:any) => {
            const markup = this.parseBlock(block);
            if (markup instanceof Error) {
                return ""; // parser for this kind of block doesn't exist
            }
            return markup;
        });
        return html.join(``);
    }

    parseBlock(block:any) {
        if (!this.parsers[block.type]) {
            return new Error(
                `${block.type} is not supported! Define your own custom function.`
            );
        }
        try {
            return this.parsers[block.type](block.data, this.config);
        } catch (err) {
            return err;
        }
    }
}