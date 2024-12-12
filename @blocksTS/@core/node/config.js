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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocks = void 0;
const arg_1 = __importDefault(require("arg"));
const node_1 = require("../../@base/node");
const _node_1 = require("../../@node");
const prettify_1 = require("../../@plain/prettify");
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
    //----------------------------------------------------------------------
    framework: {
        run: ({ script, packageConfigFilePath }) => {
            packageConfigFilePath ? packageConfigFilePath : './';
            _node_1.npm.run({ script, packageJsonFilePath: packageConfigFilePath });
        },
    },
    //----------------------------------------------------------------------
    cli: {
        package: {
            script: {
                dev: 'dev:dist',
                prod: 'prod:build',
            },
        },
        config: {
            create: ({ content }) => {
                console.log('from folder/file create func(): ', content);
                console.log('from folder/file create func(): ', content.cli.custom);
                folder_1.folder.create({ folderPath: resolvedPath.folder });
                file_1.file.create.withContent({
                    filePathName: resolvedPath.file.js,
                    content,
                    type: 'object',
                    prependText,
                    appendText,
                });
                file_1.file.create.withContent({
                    filePathName: resolvedPath.file.dts,
                    content: 'declare module \'@collabo-community/building-blocks/config/settings/cli.js\';',
                    type: 'string',
                });
            },
            update: ({ content }) => {
                console.log('from folder/file UPDATE func(): ', content);
                console.log('from folder/file UPDATE func(): ', content.cli.custom);
                file_1.file.content.overwrite({
                    filePathName: resolvedPath.file.js,
                    content,
                    type: 'object',
                    prependText,
                    appendText,
                });
            },
            set: (_a) => __awaiter(void 0, [_a], void 0, function* ({ env }) {
                // const usersCliCustomCommand = blocks.cli.custom.command.get();
                const npmLifeCycleEvent = env.npm_lifecycle_event;
                // console.log({ usersCustomCommand });
                // console.log({ npmLifeCycleEvent });
                let settings = {
                    cli: {
                        custom: {
                            command: npmLifeCycleEvent === undefined,
                            commandUsedAtLeastOnce: false,
                            script: '',
                        },
                    }
                };
                const createConfig = ({ content, script }) => {
                    settings.cli.isInDevMode = script === blocks.cli.package.script.dev;
                    blocks.cli.config.create({ content });
                };
                const updateConfig = ({ content, script }) => {
                    settings.cli.isInDevMode = script === blocks.cli.package.script.dev;
                    blocks.cli.config.update({ content });
                };
                if (settings.cli.custom.command) {
                    if (!configFilesExist) {
                        //----------------------------------------------
                        prettify_1.log.warning('Using Math to random to simulate user\'s choice from inquirer');
                        const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.script.dev : blocks.cli.package.script.prod;
                        settings.cli.custom.script = usersScriptChoice;
                        //----------------------------------------------
                        settings.cli.custom.commandUsedAtLeastOnce = true;
                        //----------------------------------------------
                        settings.cli.custom.command = true;
                        createConfig({
                            content: settings,
                            script: settings.cli.custom.script
                        });
                    }
                    else {
                        const { default: config } = yield Promise.resolve(`${resolvedPath.file.js}`).then(s => __importStar(require(s)));
                        //--------------------
                        settings = config;
                        //--------------------
                        if (!settings.cli.custom.commandUsedAtLeastOnce) {
                            //----------------------------------------------
                            prettify_1.log.warning('*** - *** - Using Math to random to simulate user\'s choice from inquirer');
                            const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.script.dev : blocks.cli.package.script.prod;
                            settings.cli.custom.script = usersScriptChoice;
                            //----------------------------------------------
                            settings.cli.custom.commandUsedAtLeastOnce = true;
                            //----------------------------------------------
                        }
                        settings.cli.custom.command = true;
                        updateConfig({
                            content: settings,
                            script: settings.cli.custom.script
                        });
                    }
                }
                if (!settings.cli.custom.command) {
                    if (!configFilesExist) {
                        createConfig({ content: settings, script: npmLifeCycleEvent });
                    }
                    else {
                        const { default: config } = yield Promise.resolve(`${resolvedPath.file.js}`).then(s => __importStar(require(s)));
                        //--------------------
                        settings = config;
                        //--------------------
                        settings.cli.custom.command = false;
                        updateConfig({ content: settings, script: npmLifeCycleEvent });
                    }
                }
            }),
        },
        // run: ({ settings }: { settings: Config | Record<string, never> }) => {
        //     console.log('From run func(): ', settings);
        //     // settings.cli.blocks.script = settings.cli.blocks.command ? `cli:${settings.cli.blocks.script}` : settings.cli.blocks.script;
        //     blocks.framework.run({ script: settings.cli.custom.script });
        // },
        custom: {
            command: {
                script: {
                    full: 'blocks-assistant',
                    short: 'blocks',
                },
                get: () => {
                    try {
                        let options;
                        const args = (0, arg_1.default)({}, 
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        (options = { permissive: false, argv: process.argv.slice(1) }));
                        let blocksCommand = '';
                        if (args._[0].slice(-blocks.cli.custom.command.script.full.length) === blocks.cli.custom.command.script.full)
                            blocksCommand = blocks.cli.custom.command.script.full;
                        if (args._[0].slice(-blocks.cli.custom.command.script.short.length) === blocks.cli.custom.command.script.short)
                            blocksCommand = blocks.cli.custom.command.script.short;
                        return blocksCommand;
                    }
                    catch (err) {
                        prettify_1.log.error(`ERRRRRROR: ${err}`);
                    }
                    return;
                },
            },
        },
    },
};
exports.blocks = blocks;
