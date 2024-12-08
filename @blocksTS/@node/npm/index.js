"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npm = void 0;
const child_process_1 = require("child_process");
const npm = {
    run: ({ script, packageJsonFilePath }) => {
        packageJsonFilePath = packageJsonFilePath ? packageJsonFilePath : './';
        const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        (0, child_process_1.spawn)(npm, ['run', script], { cwd: packageJsonFilePath, stdio: 'inherit' });
    },
};
exports.npm = npm;
