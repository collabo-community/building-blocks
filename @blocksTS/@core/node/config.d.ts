interface Config {
    cli: {
        blocks: {
            command?: boolean;
            commandfirstTimeUsage?: boolean;
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
    command: {
        script: {
            full: string;
            short: string;
        };
        get: () => string | undefined;
    };
    cli: {
        package: {
            script: {
                dev: string;
                prod: string;
            };
        };
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
