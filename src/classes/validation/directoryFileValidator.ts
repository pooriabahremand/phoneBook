// importing the required modules
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'
// creating and exporting class DirectoryFileValidator
export default class DirectoryFileValidator {
  // constructor of class DirectoryFileValidator
  constructor () {
    // check for the existence of directory storage , if it does not exist , create one
    if (!existsSync('./storage')) {
      mkdirSync('./storage')
    }
  }

  // validator method that returns void
  validator (argFormat: string): void {
    // creatign const filePath to create the filePath of the needed storage with the help of path module
    const filePath = path.join('storage', `phoneBook.${argFormat}`)
    // if it does not exist , create a new one
    if (!existsSync(filePath)) {
      writeFileSync(filePath, '')
    }
  }
}
