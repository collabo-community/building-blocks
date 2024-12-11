import arg, { Options } from 'arg';
import { _blocks } from '../../@base/node';
import { npm } from '../../@node';
import { log } from '../../@plain/prettify';
import { file } from '../../@node/file';
import { folder } from '../../@node/folder';

interface Config {
    cli: {
        // blocksCommand: boolean;
        // userIsFirstTimer?: boolean;
        blocks: {
            command?: boolean;
            commandfirstTimeUsage?: boolean;
            script: string;
        };
        isDevMode?: boolean;
    },
}

const resolvedPath = {
    folder: _blocks.lib.path.resolve({ targetFolder: 'config/settings' }),
    file: {
        js: _blocks.lib.path.resolve({ targetFolder: 'config/settings/cli.js' }),
        dts: _blocks.lib.path.resolve({ targetFolder: 'config/settings/cli.d.ts' }),
    },
};

const cliSettingsFile = {
    js: file.exists({ filePathName: resolvedPath.file.js }),
    dts: file.exists({ filePathName: resolvedPath.file.dts }),
};

// TODO: Add comment about what the methods do/return returns...
const [prependText, appendText] = ['const config = ', '\nexport default config;'];
const configFilesExist = cliSettingsFile.js && cliSettingsFile.dts;

const blocks = {
    framework: {
        run: ({ script, packageConfigFilePath }: { script: string; packageConfigFilePath?: string }) => {
            packageConfigFilePath ? packageConfigFilePath : './';
            npm.run({script, packageJsonFilePath: packageConfigFilePath });
        },
    },
    command: {
        script: {
            full: 'blocks-assistant',
            short: 'blocks',
        },
        get: () => {
            try {
                let options: Options;
                const args = arg(
                    {},
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (options = { permissive: false, argv: process.argv.slice(1) })
                );
                let blocksCommand = '';
                if (args._[0].slice(-16) === blocks.command.script.full) blocksCommand = blocks.command.script.full;
                if (args._[0].slice(-6) === blocks.command.script.short) blocksCommand = blocks.command.script.short;
                return blocksCommand;
             } catch (err) {
               log.error(`ERRRRRROR: ${err}`);
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
            set: async ({ settings }: { settings: Config | Record<string, never> }) => {
                // commenting out since update should only happen when next a (different) command is run
                // if (configFilesExist) {
                //     // const { default: config } = await import(resolvedPath.file.js);
                //     // blocks.cli.config.update({ settings: config });
                // } 

                if (!configFilesExist) {
                    if (settings.cli.blocks.command) { // only trigger npm run if blocksCommand, so that it doesn't keep looping...
                        log.warning('Using Math to random to simulate user\'s choice from inquirer');
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
            },
            create: async ({ settings }: { settings: Config | Record<string, never> }) => {
                folder.create({ folderPath: resolvedPath.folder });
                file.create.withContent({ 
                    filePathName: resolvedPath.file.js,
                    content: settings,
                    type: 'object',
                    prependText,
                    appendText,
                });
                file.create.withContent({ 
                    filePathName: resolvedPath.file.dts,
                    content: 'declare module \'@collabo-community/building-blocks/config/settings/cli.js\';',
                    type: 'string',
                });
            },
            update: async ({ settings }: { settings: Config | Record<string, never> }) => {
                file.content.overwrite({
                    filePathName: resolvedPath.file.js,
                    content: settings,
                    type: 'object',
                    prependText,
                    appendText,
                });
            },
        },
    },
};

export {
    blocks,
};