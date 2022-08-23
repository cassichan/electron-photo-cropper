//File system
import fs from "fs"

//Create file reader and when file finishes loading, returns promise with result(data from file)
export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
}
