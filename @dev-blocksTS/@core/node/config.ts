import arg, { Options } from 'arg';
import { _blocks } from '../../@base/node';
import { npm } from '../../@node';
import { log } from '../../@plain/prettify';
import { file } from '../../@node/file';
import { folder } from '../../@node/folder';

interface Config {
    cli: {
        blocks: {
            command?: boolean;
            commandUsedAtLeastOnce?: boolean;
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
    //----------------------------------------------------------------------
    framework: {
        run: ({ script, packageConfigFilePath }: { script: string; packageConfigFilePath?: string }) => {
            packageConfigFilePath ? packageConfigFilePath : './';
            npm.run({script, packageJsonFilePath: packageConfigFilePath });
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
            true: ({ settings }: { settings: Config | Record<string, never>, config?: Config | Record<string, never>  }) => {
                settings.cli.blocks = JSON.parse(JSON.stringify(settings.cli.blocks));
                const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.script.dev : blocks.cli.package.script.prod;
                settings.cli.blocks.script = usersScriptChoice;
                log.warning('Using Math to random to simulate user\'s choice from inquirer');
                !configFilesExist ? blocks.cli.inquire.false.config.create({ settings }) : blocks.cli.inquire.false.config.update({ settings });
            },
            false: {
                config: {
                    create: ({ settings }: { settings: Config | Record<string, never> }) => {
                        blocks.cli.config.create({ settings });
                        blocks.cli.run({ settings });
                    },
                    update: ({ settings }: { settings: Config | Record<string, never> }) => {
                        blocks.cli.config.update({ settings });
                        blocks.cli.run({ settings });
                    }
                }
            }
        },
        run: ({ settings }: { settings: Config | Record<string, never> }) => {
            settings.cli.blocks.script = settings.cli.blocks.command ? `cli:${settings.cli.blocks.script}` : settings.cli.blocks.script;
            blocks.framework.run({ script: settings.cli.blocks.script });
        },
        config: {
            set: async ({ settings }: { settings: Config | Record<string, never> }) => {
                if (!configFilesExist) {
                    if (settings.cli.blocks.command) {
                        settings.cli.blocks.commandUsedAtLeastOnce = settings.cli.blocks.commandUsedAtLeastOnce === undefined;
                        blocks.cli.inquire.true({ settings });
                    } else {
                        settings.cli.blocks.commandUsedAtLeastOnce = false;
                        blocks.cli.config.create({ settings });
                    }
                }

                if (configFilesExist) {
                    if (settings.cli.blocks.command) {
                        const { default: config } = await import(resolvedPath.file.js);
                        if (!config.cli.blocks.commandUsedAtLeastOnce) {
                            settings.cli.blocks.commandUsedAtLeastOnce = true;
                            blocks.cli.inquire.true({ settings, config });
                        } else {
                            settings.cli.blocks = config.cli.blocks;
                            blocks.cli.run({ settings });
                        }
                    }
                    if (!settings.cli.blocks.command) {
                        blocks.framework.run({ script: settings.cli.blocks.script });
                    }
                }
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
        custom: {
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
                        if (args._[0].slice(-blocks.cli.custom.command.script.full.length) === blocks.cli.custom.command.script.full) blocksCommand = blocks.cli.custom.command.script.full;
                        if (args._[0].slice(-blocks.cli.custom.command.script.short.length) === blocks.cli.custom.command.script.short) blocksCommand = blocks.cli.custom.command.script.short;
                        return blocksCommand;
                     } catch (err) {
                       log.error(`ERRRRRROR: ${err}`);
                     }
                     return;
                }
            },
        },
    },
    //----------------------------------------------------------------------
};

export {
    blocks,
};