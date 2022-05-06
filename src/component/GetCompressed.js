import imageCompression from 'browser-image-compression';


function GetCompressed(props) {

    async function handleChange(event) {

        const imageFile = event.target.files[0];
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

      }      
      
      const handleSubmit=()=>{
          alert('submited')
      }
      
  return (
    <>
     <div  >
     <form onSubmit={handleSubmit}>
     <input type="file" value={props.croppedImage} onChange={event => handleChange(event)} />
     </form>
     </div>
    </> 
  );
}

export default GetCompressed;