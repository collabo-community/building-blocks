import {
  green,
  red,
  greenBright,
  redBright,
  cyanBright,
  yellowBright
} from 'chalk';

/* eslint-disable no-console */

const prettify = {
  /* -------------------------------
    Apply color to the whole message
    in console.log()
  --------------------------------*/
  log: {
    success: (message: string) => {
      console.log( prettify.text.success(message) );
    },
    warning: (message: string) => {
      console.log( prettify.text.warning(message) );
    },
    error: (message: string) => {
      console.log( prettify.text.error(message) );
    },
    color: {
      none: (message: string) => {
        console.log(message);
      },
      //----------------------------------
      redBold: (message: string, err: string) => {
        console.log( prettify.text.color.redBold(message), err );
      },
      //----------------------------------
      cyanBright: (message: string) => {
        console.log( prettify.text.color.cyanBright(message) );
      },
      green: (message: string) => {
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
    success: (message: string) => {
      return greenBright(message);
    },
    warning: (message: string) => {
      return yellowBright(message);
    },
    error: (message: string) => {
      return redBright(message);
    },
    color: {
      redBold: (message: string) => {
        return red.bold(message);
      },
      cyanBright: (message: string) => {
        return cyanBright(message);
      },
      green: (message: string) => {
        return green(message);
      }
    }
  }
};

const { log, text } = prettify;

export {
    //------ 
    prettify,
    //-------
    log,
    text,
    //-------
};
