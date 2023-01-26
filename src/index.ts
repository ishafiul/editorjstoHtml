
import defaultParsers from "./parsers";
import defaultConfig from "./config";
import {mergeDeep, embedMarkups} from "./utitlities";
export default class EJS {
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
        return html.join(`<style>
.cdx-marker {
  background: rgba(245,235,111,0.29);
  padding: 3px 0;
}
.inline-code {
  background: rgba(250, 239, 240, 0.78);
  color: #b44437;
  padding: 3px 4px;
  border-radius: 5px;
  margin: 0 1px;
  font-family: inherit;
  font-size: 0.86em;
  font-weight: 500;
  letter-spacing: 0.3px;
}
</style>`);
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