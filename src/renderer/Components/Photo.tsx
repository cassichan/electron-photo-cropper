import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { readFile } from '../../helpers/images';

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); //file data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const [fileName, setFileName] = useState(null); //file address

  //e.target.files will return an array
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      //we got a file..
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      // setFileName(file.path); //setFileName to the path for this specific image file
      //get the image data from the file
      const imageData: any = await readFile(file);
      //setImageSrc to that image data
      setImageSrc(imageData);
    }
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
      <Cropper image={imageSrc}
      crop={crop}
      zoom={zoom}
      onCropChange={setCrop}
      onZoomChange={setZoom} />
    </>
  );
}
