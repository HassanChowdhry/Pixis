import { useState , useRef} from 'react';
import "./CreatePhoto.css"

function PhotoUploadForm(props) {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const imageButton = useRef();
  
  const handleImageChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(
      `caption: ${caption}, location: ${location}, preview: ${file}`
    );

    await postPicture()
    props.onClick();
  };

  const removePhoto = (e) => {
    setPreview(null)
  }

  const imageButtonHandler = () => {
    imageButton.current.click();
  }

  const postPicture = async () => {    
    const formData = new FormData();
    formData.append('photo', file); // photo is what multer uses to process the file
    formData.append('location', location);
    formData.append('caption', caption);
    formData.append('userID', props.data.userID);

    fetch(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/photos`, {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};

  return (
    <div className="form-container">
      <section className='h-[800px] w-[960px] m-auto flex align-middle bg-[#282c34] rounded-md'>
        <div className='absolute w-[960px] text-center border-b-[1px] border-gray-600'>
          <h2 className='p-2 text-xl font-bold tracking-tight'> Create Photo </h2>    
        </div>
        <form className='photo-form h-[800px]' onSubmit={handleSubmit}>
          <div className='flex flex-row-reverse w-[960px] h-[758px] mt-[44px]'>
            <div className='w-2/5 p-3'>
              <textarea
                id="caption"
                name="caption"
                type="text"
                value={caption}
                placeholder="Write Caption..."
                rows={10}
                
                onChange={(ev) => setCaption(ev.target.value)}
                className="block w-full rounded-md resize-none border-b-2 focus:border-gray-400 border-gray-600 border-t-0 border-r-0 border-l-0 bg-transparent shadow-sm focus:ring-transparent sm:text-md sm:leading-6"
              />
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                placeholder="Add Location"
                onChange={(ev) => setLocation(ev.target.value)}
                className="block w-full py-3 rounded-md bg-transparent border-b-2 border-t-0 border-r-0 border-l-0 focus:border-gray-400 border-gray-600 shadow-sm focus:ring-transparent sm:text-md sm:leading-6"
              />
              {preview &&                 
                <button 
                  type="button" 
                  className="flex w-1/2 my-5 justify-center text-md rounded-md border-2 text-red-700 border-red-700 bg-transparent px-3 py-2 text-md font-semibold leading-6 shadow-sm hover:bg-red-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={removePhoto}
                >
                  Remove Photo
                </button>
              }
              <button 
                type="submit" 
                className="flex w-full my-5 justify-center text-lg rounded-md bg-primary px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Add Photo
              </button>
            </div>
            <div className='w-3/5 h-full z-2'>
              {!preview && 
                <div className='h-full flex items-center justify-center'>
                  <button
                    type = 'button'
                    className="w-[200px] py-2 text-lg rounded-md bg-primary text-md font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={imageButtonHandler}
                  >
                    <div className='w-[200px] absolute'>Browse image</div>
                    <input className='upload-btn' ref={imageButton} type="file" onChange={handleImageChange} accept="image/*" />
                  </button>
                </div>
              }
              {preview && <img className="form-image" src={preview} alt="Preview" />}
            </div>
          </div>
        </form>
      </section>
    </div>

  );
}

export default PhotoUploadForm;
