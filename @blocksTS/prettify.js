import chalk from 'chalk';

/* eslint-disable no-console */

const prettify = {
  /* -------------------------------
    Apply color to the whole message
    in console.log()
  --------------------------------*/
  log: {
    success: (message) => {
      console.log( prettify.text.success(message) );
    },
    warning: (message) => {
      console.log( prettify.text.warning(message) );
    },
    error: (message) => {
      console.log( prettify.text.error(message) );
    },
    color: {
      none: (message) => {
        console.log(message);
      },
      //----------------------------------
      redBold: (message, err) => {
        console.log( prettify.text.color.redBold(message), err );
      },
      //----------------------------------
      cyanBright: (message) => {
        console.log( prettify.text.color.cyanBright(message) );
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
      return chalk.greenBright(message);
    },
    warning: (message) => {
      return chalk.yellowBright(message);
    },
    error: (message) => {
      return chalk.redBright(message);
    },
    color: {
      redBold: (message) => {
        return chalk.red.bold(message);
      },
      cyanBright: (message) => {
        return chalk.cyanBright(message);
      },
      green: (message) => {
        return chalk.green(message);
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
