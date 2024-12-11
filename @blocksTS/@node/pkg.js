"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npm = void 0;
const node_1 = require("../@base/node");
const pkg_manager = {
    npm: {
        run: ({ script, packageJsonFilePath }) => {
            node_1._pkg_manager.run({ script, packageConfigFilePath: packageJsonFilePath });
        },
    },
};
const { npm } = pkg_manager;
exports.npm = npm;
