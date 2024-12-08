"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const fs_1 = require("fs");
const file = {
    create: {
        withContent: ({ filePathName, content }) => {
            return file.content.add({ filePathName, content });
        },
        withoutContent: ({ filePathName }) => {
            return file.content.add({ filePathName });
        },
    },
    content: {
        // get: ({ test }: { test: any }) => {
        // },
        add: ({ filePathName, content }) => {
            content = content ? content : '';
            (0, fs_1.writeFileSync)(filePathName, content);
            return;
        },
        overwrite: ({ filePathName, content }) => {
            return file.content.add({ filePathName, content });
        },
    },
    exists: ({ filePathName }) => {
        return (0, fs_1.existsSync)(filePathName);
    }
};
exports.file = file;
