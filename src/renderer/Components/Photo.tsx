import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { readFile, cropImageData
} from '../../main/helpers';

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); //file data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFileName] = useState(null); //file address
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback(
    (_croppedArea: Area, currentCroppedAreaPixels: Area) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
    },
    []
  );

  //e.target.files will return an array
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      //we got a file..
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      setFileName(file.path); //setFileName to the path for this specific image file
      //get the image data from the file
      const imageData: any = await readFile(file);
      //setImageSrc to that image data
      setImageSrc(imageData);
    }
  };

  const handleSave = async () => {
    //Save cropped image
    //first create cropped image data using a canvas
    const base64data = await cropImageData(imageSrc, croppedAreaPixels!) //tell it will always be an area
    .catch(console.error)
    //create new file name
    const newFileName = fileName + '-cropped.png'
    //then send those results to saveImage via ipcRender event
    window.electron.saveCroppedImage([newFileName, base64data])
    //Reset interface
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  if (!imageSrc) {
    return (
      <>
        <h1>Please choose photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }

  return (
    <>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </>
  );
}
