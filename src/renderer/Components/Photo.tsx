import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { readFile,
  // saveCroppedImage
} from '../../main/helpers';

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); //file data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFileName] = useState(null); //file address
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback(
    (croppedArea: Area, _croppedAreaPixels: Area) => {
      setCroppedAreaPixels(_croppedAreaPixels);
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

  const handleSave = () => {
    //Save cropped image
    // saveCroppedImage(fileName, imageSrc, croppedAreaPixels);
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
