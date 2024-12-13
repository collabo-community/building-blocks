"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._file = void 0;
const fs_1 = require("fs");
const util_1 = __importDefault(require("util"));
const _file = {
    content: {
        none: ({ filePathName }) => {
            return _file.content.write({ filePathName, content: '', type: 'string' });
        },
        write: ({ filePathName, content, type, prependText, appendText }) => {
            if (type === 'string') {
                content = content ? content : '';
                (0, fs_1.writeFileSync)(filePathName, content);
            }
            if (type === 'object') {
                content = content ? content : {};
                prependText = prependText ? prependText : '';
                appendText = appendText ? appendText : '';
                (0, fs_1.writeFileSync)(filePathName, `${prependText}${util_1.default.inspect(content)}${appendText}`, 'utf-8');
            }
            // TODO: if (type === 'json') {}
            return;
        },
    },
};
exports._file = _file;
