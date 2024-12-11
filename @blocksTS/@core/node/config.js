"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocks = void 0;
const node_1 = require("../../@base/node");
const _node_1 = require("../../@node");
// import { log } from '../../@plain/prettify';
const file_1 = require("../../@node/file");
const folder_1 = require("../../@node/folder");
const resolvedPath = {
    folder: node_1._blocks.lib.path.resolve({ targetFolder: 'config/settings' }),
    file: {
        js: node_1._blocks.lib.path.resolve({ targetFolder: 'config/settings/cli.js' }),
        dts: node_1._blocks.lib.path.resolve({ targetFolder: 'config/settings/cli.d.ts' }),
    },
};
const cliSettingsFile = {
    js: file_1.file.exists({ filePathName: resolvedPath.file.js }),
    dts: file_1.file.exists({ filePathName: resolvedPath.file.dts }),
};
// TODO: Add comment about what the methods do/return returns...
const [prependText, appendText] = ['const config = ', '\nexport default config;'];
const configFilesExist = cliSettingsFile.js && cliSettingsFile.dts;
const blocks = {
    framework: {
        run: ({ script, packageConfigFilePath }) => {
            packageConfigFilePath ? packageConfigFilePath : './';
            _node_1.npm.run({ script, packageJsonFilePath: packageConfigFilePath });
        },
    },
    cli: {
        script: {
            dev: 'cli:dev',
            prod: 'prod:build',
        },
        config: {
            set: (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings }) {
                // commenting out since update should only happen when next a (different) command is run
                // if (configFilesExist) {
                //     // const { default: config } = await import(resolvedPath.file.js);
                //     // blocks.cli.config.update({ settings: config });
                // } 
                if (!configFilesExist) {
                    blocks.cli.config.create({ settings });
                    blocks.framework.run({ script: settings.cli.script });
                }
                if (configFilesExist) {
                    blocks.cli.config.update({ settings });
                    const { default: config } = yield Promise.resolve(`${resolvedPath.file.js}`).then(s => __importStar(require(s)));
                    // console.log(config, settings);
                    settings = config;
                    if (settings.cli.isDevMode) { // only trigger npm run if isDevMode, so that it doesn't keep looping...
                        blocks.framework.run({ script: settings.cli.script });
                    }
                }
                // if (configFilesExist) {
                // const { default: config } = await import(resolvedPath.file.js);
                // console.log(config, settings);
                // settings = config;
                // blocks.framework.run({ script: settings.cli.script });
                // npm.run({ script: settings.cli.script, packageJsonFilePath: './'});
                // }
                // if (configFilesExist) {
                //     // const { default: config } = await import(resolvedPath.file.js);
                //     // settings = config;
                //     // blocks.framework.run({ script: config.cli.script });
                //     // blocks.cli.config.update({ settings });
                //     // settings.cli.script = '';
                //     // blocks.cli.config.set({ settings: {}})
                //     // console.log('config.cli.script: ', config.cli.script);
                //     // config.cli.script = config ? config.cli.script : '';
                //     // config ? blocks.framework.run({ script: config.cli.script }) : null;
                // 
                return;
            }),
            create: (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings }) {
                folder_1.folder.create({ folderPath: resolvedPath.folder });
                file_1.file.create.withContent({
                    filePathName: resolvedPath.file.js,
                    content: settings,
                    type: 'object',
                    prependText,
                    appendText,
                });
                file_1.file.create.withContent({
                    filePathName: resolvedPath.file.dts,
                    content: 'declare module \'@collabo-community/building-blocks/config/settings/cli.js\';',
                    type: 'string',
                });
            }),
            update: (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings }) {
                file_1.file.content.overwrite({
                    filePathName: resolvedPath.file.js,
                    content: settings,
                    type: 'object',
                    prependText,
                    appendText,
                });
            }),
        },
    },
};
exports.blocks = blocks;
