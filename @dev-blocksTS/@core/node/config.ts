import { _blocks } from '../../@base/node';
import { npm } from '../../@node';
// import { log } from '../../@plain/prettify';
import { file } from '../../@node/file';
import { folder } from '../../@node/folder';

interface Config {
    cli: {
        isDevMode: boolean;
        script: string;
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
    cli: {
        script: {
            dev: 'cli:dev',
            prod: 'prod:build',
        },
        config: {
            set: async ({ settings }: { settings: Config | Record<string, never> }) => {
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
                    const { default: config } = await import(resolvedPath.file.js);
                    // console.log(config, settings);
                    settings = config; //Use settings from config
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