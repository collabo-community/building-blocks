"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._pkg_manager = void 0;
const child_process_1 = require("child_process");
const _pkg_manager = {
    run: ({ script, packageConfigFilePath }) => {
        packageConfigFilePath = packageConfigFilePath ? packageConfigFilePath : './';
        const pkg_manager = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        (0, child_process_1.spawn)(pkg_manager, ['run', script], { cwd: packageConfigFilePath, stdio: 'inherit' });
    },
};
exports._pkg_manager = _pkg_manager;
