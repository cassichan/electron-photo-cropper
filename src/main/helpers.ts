import { Area } from 'react-easy-crop';

//Create file reader and when file finishes loading, returns promise with result(data from file)
export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

//Creating image, not saved yet

function createImage (url: string) {
  return new Promise((resolve, reject) => {
    //Image is a file type from html
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    // Should allow image to be used in any website
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url; //set source of image to the data we send in
  });
};

export async function cropImageData(imageSrc: any, croppedAreaPixels: Area) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const maxSize = Math.max(image.width, image.height);
  canvas.width = maxSize;
  canvas.height = maxSize;
  ctx?.drawImage(
    image,
    maxSize / 2 - image.width / 2,
    maxSize / 2 - image.height / 2
  );
  const data: any = ctx?.getImageData(0, 0, maxSize, maxSize);
  // now we can set the canvas to our desired size...
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  // now drop our image data in with the correct position from cropping...
  ctx?.putImageData(
    data,
    Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.x),
    Math.round(0 - maxSize / 2 + image.height / 2 - croppedAreaPixels.y)
  );
  const url: any = canvas.toDataURL('image/jpg', 0.8);
  const base64data = url.replace(/^data:image\/png;base64,/, '');
  return base64data;
}
