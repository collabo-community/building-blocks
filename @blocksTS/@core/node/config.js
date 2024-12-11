"use strict";
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
    framework: {
        run: ({ script, packageConfigFilePath }) => {
            packageConfigFilePath ? packageConfigFilePath : './';
            _node_1.npm.run({ script, packageJsonFilePath: packageConfigFilePath });
        },
    },
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
                if (args._[0].slice(-16) === blocks.command.script.full)
                    blocksCommand = blocks.command.script.full;
                if (args._[0].slice(-6) === blocks.command.script.short)
                    blocksCommand = blocks.command.script.short;
                return blocksCommand;
            }
            catch (err) {
                prettify_1.log.error(`ERRRRRROR: ${err}`);
            }
            return;
        }
    },
    cli: {
        package: {
            script: {
                dev: 'dev:dist',
                prod: 'prod:build',
            },
        },
        config: {
            set: (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings }) {
                // commenting out since update should only happen when next a (different) command is run
                // if (configFilesExist) {
                //     // const { default: config } = await import(resolvedPath.file.js);
                //     // blocks.cli.config.update({ settings: config });
                // } 
                if (!configFilesExist) {
                    if (settings.cli.blocks.command) { // only trigger npm run if blocksCommand, so that it doesn't keep looping...
                        prettify_1.log.warning('Using Math to random to simulate user\'s choice from inquirer');
                        const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.script.dev : blocks.cli.package.script.prod;
                        settings.cli.blocks.script = usersScriptChoice;
                    }
                    console.log('settings: ', settings);
                    blocks.cli.config.create({ settings });
                    settings.cli.blocks.script = settings.cli.blocks.command ? `cli:${settings.cli.blocks.script}` : settings.cli.blocks.script;
                    blocks.framework.run({ script: settings.cli.blocks.script });
                }
                // if (configFilesExist) {
                //     blocks.cli.config.update({ settings });
                //     const { default: config } = await import(resolvedPath.file.js);
                //     // console.log(config, settings);
                //     settings = config; //Use settings from config
                //     if (settings.cli.blocks.command) { // only trigger npm run if blocksCommand, so that it doesn't keep looping...
                //         blocks.framework.run({ script: settings.cli.script });
                //     }
                // }
                // If pkgScripts (first) also create, but (later) continue to update config
                // If blocks command (first) also create, but (later) don't update config
                // If "First timer user" is TRUE: (only blocks command? or whether it's blocksCommand or prod command?) Inquirer asks user (dev or prod mode)?
                //                                 And then creates the config files, and save user's selection.
                // if "First timer user" is FALSE: No update to config files, it just uses what's saved in the config
                //                                 Any other time user
                // if (!configFilesExist) {
                //     blocks.cli.config.create({ settings });
                //     blocks.framework.run({ script: settings.cli.script });
                // }
                // if (configFilesExist) {
                //     blocks.cli.config.update({ settings });
                //     const { default: config } = await import(resolvedPath.file.js);
                //     // console.log(config, settings);
                //     settings = config; //Use settings from config
                //     if (settings.cli.blocksCommand) { // only trigger npm run if blocksCommand, so that it doesn't keep looping...
                //         blocks.framework.run({ script: settings.cli.script });
                //     }
                // }
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
