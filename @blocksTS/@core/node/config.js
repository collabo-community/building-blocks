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
        inquire: {
            true: ({ settings }) => {
                settings.cli.blocks = JSON.parse(JSON.stringify(settings.cli.blocks));
                const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.script.dev : blocks.cli.package.script.prod;
                settings.cli.blocks.script = usersScriptChoice;
                prettify_1.log.warning('Using Math to random to simulate user\'s choice from inquirer');
                !configFilesExist ? blocks.cli.inquire.false.config.create({ settings }) : blocks.cli.inquire.false.config.update({ settings });
            },
            false: {
                config: {
                    create: ({ settings }) => {
                        blocks.cli.config.create({ settings });
                        blocks.cli.run({ settings });
                    },
                    update: ({ settings }) => {
                        blocks.cli.config.update({ settings });
                        blocks.cli.run({ settings });
                    }
                }
            }
        },
        run: ({ settings }) => {
            settings.cli.blocks.script = settings.cli.blocks.command ? `cli:${settings.cli.blocks.script}` : settings.cli.blocks.script;
            blocks.framework.run({ script: settings.cli.blocks.script });
        },
        config: {
            set: (_a) => __awaiter(void 0, [_a], void 0, function* ({ settings }) {
                if (!configFilesExist) {
                    if (settings.cli.blocks.command) {
                        settings.cli.blocks.commandUsedAtLeastOnce = settings.cli.blocks.commandUsedAtLeastOnce === undefined;
                        blocks.cli.inquire.true({ settings });
                    }
                    else {
                        settings.cli.blocks.commandUsedAtLeastOnce = false;
                        blocks.cli.config.create({ settings });
                    }
                }
                if (configFilesExist) {
                    if (settings.cli.blocks.command) {
                        const { default: config } = yield Promise.resolve(`${resolvedPath.file.js}`).then(s => __importStar(require(s)));
                        if (!config.cli.blocks.commandUsedAtLeastOnce) {
                            settings.cli.blocks.commandUsedAtLeastOnce = true;
                            blocks.cli.inquire.true({ settings, config });
                        }
                        else {
                            settings.cli.blocks = config.cli.blocks;
                            blocks.cli.run({ settings });
                        }
                    }
                    if (!settings.cli.blocks.command) {
                        blocks.framework.run({ script: settings.cli.blocks.script });
                    }
                }
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
                }
            },
        },
    },
    //----------------------------------------------------------------------
};
exports.blocks = blocks;
