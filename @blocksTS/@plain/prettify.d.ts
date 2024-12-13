declare const prettify: {
    log: {
        success: (message: string) => void;
        warning: (message: string) => void;
        error: (message: string) => void;
        color: {
            none: (message: string) => void;
            redBold: (message: string, err: string) => void;
            cyanBright: (message: string) => void;
            green: (message: string) => string;
        };
    };
    text: {
        success: (message: string) => string;
        warning: (message: string) => string;
        error: (message: string) => string;
        color: {
            redBold: (message: string) => string;
            cyanBright: (message: string) => string;
            green: (message: string) => string;
        };
    };
};
declare const log: {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    color: {
        none: (message: string) => void;
        redBold: (message: string, err: string) => void;
        cyanBright: (message: string) => void;
        green: (message: string) => string;
    };
}, text: {
    success: (message: string) => string;
    warning: (message: string) => string;
    error: (message: string) => string;
    color: {
        redBold: (message: string) => string;
        cyanBright: (message: string) => string;
        green: (message: string) => string;
    };
};
export { prettify, log, text, };
