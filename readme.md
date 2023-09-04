## Overview

This is an in-progress repository for a simple phonebook written in TypeScript for the Node.js environment. It uses the `readline` module for reading user inputs and the `fs` module for interacting with the computer's file system.

## How to Use It

To use this program, you need to install the following packages:

1. TypeScript
2. @types/node
3. ts-node
4. nodemon

> **Note: These packages should be installed automatically after you clone the project, but if you have problems running the app, check these packages in the `package-lock.json` file.**

Finally, you can start the program by running this command: `npm start`

You can also specify the format you want to use by adding one of these arguments to the command: `csv`, `xml`, or `xlsx`. For example, to use the CSV format, you would run this command: `npm start csv`. If you do not enter any argument, the default behavior is for the format to be JSON.

## New Feature: Converting Between Formats

In the newest update, we added the functionality of converting different formats to each other. For example, by running this command: `npm start json xlsx`, you can convert data from a JSON file to an XLSX file. This allows you to easily switch between different formats and work with your data in the format that best suits your needs.
