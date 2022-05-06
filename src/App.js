import './App.css';
import React, { useState } from 'react';
import ImageCropper from './component/GetCropped';
import GetCompressed from './component/GetCompressed';
import imageCompression from 'browser-image-compression';

function App() {

  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

  const onUploadFile = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () =>
        setImageToCrop(reader.result)
      );

      reader.readAsDataURL(event.target.files[0]);
    }

    const imageFile =  event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

  } catch (error) {
    console.log(error);
  }
  };



  


  return (
    <>
      <div className='container'>
        
        <div className='row'>
          <div className='col-lg-6'>

            <input
              type="file"
              accept="image/*"
              onChange={onUploadFile}
            />
            <div>
              <ImageCropper
                imageToCrop={imageToCrop}
                onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
              />
            </div>
            {
              croppedImage &&
              <div>
                <h2>Cropped Image</h2>
                <img
                  alt="Cropped Image"
                  src={croppedImage}
                />
              </div>
            }
          </div>
        </div>
        {/* <GetCompressed  croppedImage = {croppedImage}/> */}
      </div>
    </>
  );
}

export default App;
