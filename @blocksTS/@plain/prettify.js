"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = exports.log = exports.prettify = void 0;
const chalk_1 = require("chalk");
/* eslint-disable no-console */
const prettify = {
    /* -------------------------------
      Apply color to the whole message
      in console.log()
    --------------------------------*/
    log: {
        success: (message) => {
            console.log(prettify.text.success(message));
        },
        warning: (message) => {
            console.log(prettify.text.warning(message));
        },
        error: (message) => {
            console.log(prettify.text.error(message));
        },
        color: {
            none: (message) => {
                console.log(message);
            },
            //----------------------------------
            redBold: (message, err) => {
                console.log(prettify.text.color.redBold(message), err);
            },
            //----------------------------------
            cyanBright: (message) => {
                console.log(prettify.text.color.cyanBright(message));
            },
            green: (message) => {
                return prettify.text.color.green(message);
            }
        },
    },
    /* ------------------------------------------
      Helpers for coloring all text within methods
      that use console.log() or for coloring some
      part of console message text
    -------------------------------------------*/
    text: {
        success: (message) => {
            return (0, chalk_1.greenBright)(message);
        },
        warning: (message) => {
            return (0, chalk_1.yellowBright)(message);
        },
        error: (message) => {
            return (0, chalk_1.redBright)(message);
        },
        color: {
            redBold: (message) => {
                return chalk_1.red.bold(message);
            },
            cyanBright: (message) => {
                return (0, chalk_1.cyanBright)(message);
            },
            green: (message) => {
                return (0, chalk_1.green)(message);
            }
        }
    }
};
exports.prettify = prettify;
const { log, text } = prettify;
exports.log = log;
exports.text = text;
