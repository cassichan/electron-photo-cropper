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

//Creating image, not saved yet

//Image is a file type from file system

//Should allow image to be used in any website



//Creating new image in memory
export async function saveCroppedImage(fileName: any, imageSrc: any, croppedAreaPixels: any ) {
  const image = await createImageBitmap(imageSrc)
  //canvas: html element
  const canvas = document.createElement("canvas")
  //get 2d context of canvas element
  const ctx = canvas.getContext("2d")
  const maxSize = Math.max(image.width, image.height)
  canvas.width = maxSize
  canvas.height = maxSize
  ctx?.drawImage(
    image,
    maxSize / 2 - image.width / 2,
    maxSize / 2 - image.height / 2
  )
  const data: any = ctx?.getImageData(0,0, maxSize, maxSize)
  //Set canvas to desired size
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height
  //Drop image data in correct position for cropping
  ctx?.putImageData(
    data,
    Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.x),
    Math.round(0 - maxSize / 2 + image.height / 2 - croppedAreaPixels.y)
  )
  const url: any = canvas.toDataURL("image/jpg", 0.8)
  //Strip off extra stuff
  const base64data = url.replace(/^data:image\/png;base64,/, "")
  //Create new file name
  const newFileName = `${fileName}-cropped.png`
  //Write new file in base64 format
fs.writeFile(newFileName, base64data, "base64", (err) => {
  if(err) {
    console.error(err)
  }
})


}
