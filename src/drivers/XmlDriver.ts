// Import necessary modules and classes
import { writeFileSync, readFileSync } from 'fs'
import path from 'path'
import type Person from './../classes/Person'
import { XMLBuilder, XMLParser, type X2jOptions } from 'fast-xml-parser'
import { type DriverInterface } from './storageDriver'

// Define the XmlDriver class that implements the DriverInterface
export default class XmlDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[]
  public filePath: string

  // Constructor for the XmlDriver class
  constructor () {
    // Set the file path for the XML file
    this.filePath = path.join('storage', 'phoneBook.xml')

    // Initialize the people property with the provided data
    this.people = []
  }

  // Method to add a new person to the people data and update the XML file
  public add (argPerson: Person): void {
    // Add the new person to the people data
    this.people.push(argPerson)

    // Create a new XMLBuilder instance with oneListGroup set to true
    const builder = new XMLBuilder({ oneListGroup: true })

    // Convert the updated people data to an XML string
    const result = builder.build(this.people)

    // Write the updated XML data to the file
    writeFileSync(this.filePath, result)
  }

  // Method to read people data from a XML file and return it as an array of Person objects
  public read (): Person[] {
    // Defining options for the XMLParser
    const options = {
      ignoreNameSpace: true,
      ignoreRootElement: true
    } as unknown as X2jOptions
    // Creating a new instance of XMLParser with options as argument and assigning it to parser
    const parser = new XMLParser(options)
    // Reading the contents of this.filePath and assigning it to content
    const content = readFileSync(this.filePath)
    // Checking if content has a length greater than 0
    if (content.length > 0) {
      // If content has a length greater than 0, parsing it using parser.parse and assigning the result to jsonObj
      const jsonObj = parser.parse(content)
      // Getting the values of jsonObj as an array of Person objects and assigning it to contacts
      const contacts: Person[] = Object.values(jsonObj)
      // Assigning contacts to this.people
      const neoContacts: Person[] = contacts.map((contact) => {
        contact.Number = '0' + contact.Number
        return { ...contact }
      })
      this.people = neoContacts
      return neoContacts
    } else {
      // If content does not have a length greater than 0, assigning an empty array to this.people
      return []
    }
  }

  // Method to convert an array of Person objects to XML format and write it to the file
  public import (argPeople: Person[]): void {
    // Create a new XMLBuilder instance with oneListGroup set to true
    const builder = new XMLBuilder({ oneListGroup: true })

    // Convert the provided people data to an XML string
    const result = builder.build(argPeople)

    // Write the converted XML data to the file
    writeFileSync(this.filePath, result)
  }
}
