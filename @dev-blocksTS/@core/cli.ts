import arg, { Options } from 'arg';
import { _blocks } from '../@base/node';
import { npm } from '../@node';
import { log } from '../@plain/prettify';
import { file } from '../@node/file';
import { folder } from '../@node/folder';

interface Config {
    cli: {
        custom: {
            command?: boolean;
            commandUsedAtLeastOnce?: boolean;
            script: string;
        };
        isInDevMode?: boolean;
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
            buildScript: {
                blocks: {
                    dev: 'blocks:dev:dist',
                    prod: 'blocks:prod:build',
                },
                other: {
                    dev: 'dev:dist',
                    prod: 'prod:build',
                },
            },
        },
        config: {
            get: async ({ env }: { env: NodeJS.ProcessEnv }) => {
                try {
                    const { default: config } = await import(resolvedPath.file.js);
                    return config;
                } catch(err) {
                    blocks.cli.config.setAndRunBuildScripts({ env }); // promisfy/await
                    log.warning('Finished building!'); 
                }
            },
            create: ({ content }: { content: Config | Record<string, never> }) => {
                // console.log('from folder/file create func(): ', content);
                // console.log('from folder/file create func(): ', content.cli.custom);
                folder.create({ folderPath: resolvedPath.folder });
                file.create.withContent({ 
                    filePathName: resolvedPath.file.js,
                    content,
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
            update: ({ content }: { content: Config | Record<string, never> }) => {
                // console.log('from folder/file UPDATE func(): ', content);
                // console.log('from folder/file UPDATE func(): ', content.cli.custom);
                file.content.overwrite({
                    filePathName: resolvedPath.file.js,
                    content,
                    type: 'object',
                    prependText,
                    appendText,
                });
            },
            setAndRunBuildScripts: async ({ env }: { env: NodeJS.ProcessEnv }) => {
                const npmLifeCycleEvent = env.npm_lifecycle_event;
                let settings: Config | Record<string, never> = {
                    cli: {
                        custom: {
                            command: npmLifeCycleEvent === undefined,
                            commandUsedAtLeastOnce: false,
                            script: '',
                        },
                    }
                }
                const createConfig = ({ content, script }: { content: Config | Record<string, never>; script: string | undefined }) => {
                    const packageScript = content.cli.custom.command ? blocks.cli.package.buildScript.blocks.dev : blocks.cli.package.buildScript.other.dev;
                    content.cli.isInDevMode = script === packageScript;
                    blocks.cli.config.create({ content });
                }

                const updateConfig = ({ content, script }: { content: Config | Record<string, never>; script: string | undefined }) => {
                    const packageScript = content.cli.custom.command ? blocks.cli.package.buildScript.blocks.dev : blocks.cli.package.buildScript.other.dev;
                    content.cli.isInDevMode = script === packageScript;
                    blocks.cli.config.update({ content });
                }

                if (settings.cli.custom.command) {
                    if (!configFilesExist) {
                        //----------------------------------------------
                        log.warning('Using Math to random to simulate user\'s choice from inquirer');
                        const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.buildScript.blocks.dev : blocks.cli.package.buildScript.blocks.prod;
                        settings.cli.custom.script = usersScriptChoice;
                        //----------------------------------------------
                        settings.cli.custom.command = npmLifeCycleEvent === undefined || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.dev || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.prod;
                        settings.cli.custom.commandUsedAtLeastOnce = true;
                        //----------------------------------------------
                        const npmRunBlocksPackageScript = usersScriptChoice.replace('blocks:', 'blocks:cli:');
                        blocks.framework.run({ script: npmRunBlocksPackageScript });
                        createConfig({ 
                            content: settings,
                            script: settings.cli.custom.script 
                        });
                    } else {
                        const { default: config } = await import(resolvedPath.file.js);
                        //--------------------
                        settings = config;
                        settings.cli.custom.command = npmLifeCycleEvent === undefined || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.dev || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.prod;
                        //--------------------
                        if (!settings.cli.custom.commandUsedAtLeastOnce) {
                            //----------------------------------------------
                            log.warning('Using Math to random to simulate user\'s choice from inquirer');
                            const usersScriptChoice = Math.random() < 0.5 ? blocks.cli.package.buildScript.blocks.dev : blocks.cli.package.buildScript.blocks.prod;
                            settings.cli.custom.script = usersScriptChoice;
                            //----------------------------------------------
                            settings.cli.custom.commandUsedAtLeastOnce = true;
                            //----------------------------------------------
                        }
                        const npmRunBlocksPackageScript = settings.cli.custom.script.replace('blocks:', 'blocks:cli:');
                        blocks.framework.run({ script: npmRunBlocksPackageScript });
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
                        const { default: config } = await import(resolvedPath.file.js);
                        //--------------------
                        settings = config;
                        //--------------------
                        settings.cli.custom.command = npmLifeCycleEvent === undefined || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.dev || npmLifeCycleEvent === blocks.cli.package.buildScript.blocks.prod;
                        updateConfig({ content: settings, script: npmLifeCycleEvent });
                    }
                }
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
                },
            },
        },
    },
};

export {
    blocks,
};