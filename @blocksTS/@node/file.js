"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const fs_1 = require("fs");
const _file_1 = require("../@base/node/_file");
const file = {
    create: {
        withContent: ({ filePathName, content, type, prependText, appendText }) => {
            return _file_1._file.content.write({ filePathName, content, type, prependText, appendText });
        },
        withoutContent: ({ filePathName }) => {
            return _file_1._file.content.none({ filePathName });
        },
    },
    content: {
        // get: async ({ resolvedPath }: { resolvedPath: string }) => {
        //     const { default: content } = await import(resolvedPath);
        //     return content;
        // },
        overwrite: ({ filePathName, content, type, prependText, appendText }) => {
            return _file_1._file.content.write({ filePathName, content, type, prependText, appendText });
        },
    },
    exists: ({ filePathName }) => {
        return (0, fs_1.existsSync)(filePathName);
    },
};
exports.file = file;
