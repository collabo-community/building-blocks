interface Config {
    cli: {
        blocks: {
            command?: boolean;
            commandUsedAtLeastOnce?: boolean;
            script: string;
        };
        isDevMode?: boolean;
    };
}
declare const blocks: {
    framework: {
        run: ({ script, packageConfigFilePath }: {
            script: string;
            packageConfigFilePath?: string;
        }) => void;
    };
    cli: {
        package: {
            script: {
                dev: string;
                prod: string;
            };
        };
        inquire: {
            true: ({ settings }: {
                settings: Config | Record<string, never>;
                config?: Config | Record<string, never>;
            }) => void;
            false: {
                config: {
                    create: ({ settings }: {
                        settings: Config | Record<string, never>;
                    }) => void;
                    update: ({ settings }: {
                        settings: Config | Record<string, never>;
                    }) => void;
                };
            };
        };
        run: ({ settings }: {
            settings: Config | Record<string, never>;
        }) => void;
        config: {
            set: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
            create: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
            update: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
        };
    };
};
export { blocks, };
