"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = __importDefault(require("./parsers"));
const config_1 = __importDefault(require("./config"));
const utitlities_1 = require("./utitlities");
class EditorJsToHtml {
    constructor(config = {}, customs = {}, embeds = {}) {
        this.config = (0, utitlities_1.mergeDeep)(config_1.default, config);
        this.config.embedMarkups = Object.assign(utitlities_1.embedMarkups, embeds);
        this.parsers = Object.assign(parsers_1.default, customs);
    }
    parse(EditorJsObject) {
        const html = EditorJsObject.blocks.map((block) => {
            const markup = this.parseBlock(block);
            if (markup instanceof Error) {
                return ""; // parser for this kind of block doesn't exist
            }
            return markup;
        });
        return html.join(``);
    }
    parseBlock(block) {
        if (!this.parsers[block.type]) {
            return new Error(`${block.type} is not supported! Define your own custom function.`);
        }
        try {
            return this.parsers[block.type](block.data, this.config);
        }
        catch (err) {
            return err;
        }
    }
}
exports.default = EditorJsToHtml;
//# sourceMappingURL=index.js.map