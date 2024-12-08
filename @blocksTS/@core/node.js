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
exports.core = void 0;
const path_1 = require("path");
const pretiffy_1 = require("../@any/pretiffy");
const npm_1 = require("../@node/npm");
const file_1 = require("../@node/file");
// TODO: Add comment about what the methods do/return returns...
const core = {
    npm: {
        run: ({ script, packageJsonFilePath }) => npm_1.npm.run({ script, packageJsonFilePath })
    },
    lib: {
        path: {
            getRootFromCoreFilePosition: ({ targetFolder }) => {
                return `../../${targetFolder}`;
            },
            resolve: ({ targetFolder }) => {
                targetFolder = core.lib.path.getRootFromCoreFilePosition({ targetFolder });
                return (0, path_1.resolve)(__dirname, targetFolder);
            },
        },
    },
    config: {
        update: {
            cli: () => __awaiter(void 0, void 0, void 0, function* () {
                let configSettings = {};
                const resolvedPath = core.lib.path.resolve({ targetFolder: `config/settings.js` });
                const configFileExists = file_1.file.exists({ filePathName: resolvedPath });
                pretiffy_1.log.warning(`${configFileExists}, ${resolvedPath}`);
                if (configFileExists) {
                    const { default: config } = yield Promise.resolve(`${resolvedPath}`).then(s => __importStar(require(s)));
                    try {
                        const isDevModeIsSet = config.cli.isDevMode === true || config.cli.isDevMode === false;
                        config.cli.isDevMode = isDevModeIsSet ? config.cli.isDevMode : true;
                        configSettings = Object.assign(Object.assign({}, config), { cli: { isDevMode: config.cli.isDevMode } });
                    }
                    catch (err) {
                        configSettings = Object.assign(Object.assign({}, config), { cli: { isDevMode: true } });
                    }
                }
                else {
                    const config = {
                        cli: {
                            isDevMode: true,
                        },
                    };
                    configSettings = config;
                }
                console.log('verdict: ', configSettings);
            }),
        },
    },
};
exports.core = core;
