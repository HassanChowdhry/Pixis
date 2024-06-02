import { useState, useRef } from 'react';
import Wrapper from '../Wrapper.js';
import "./Login.css";

const ProfileUpdateForm = () => {
  const [biography, setBiography] = useState('');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [useDefaultPfp, setUseDefaultPfp] = useState(false);
  const [error, setError] = useState('');
  const imageButton = useRef();

  const imageButtonHandler = () => {
    imageButton.current.click();
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUseDefaultPfp(false);
    }
  };

  const handleDefaultPfpChange = () => {
    setUseDefaultPfp(!useDefaultPfp);
    if (!useDefaultPfp) {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!biography) {
      setError('Biography is required');
      return;
    }

    setError('');

    // Here, you would normally handle the form submission,
    // e.g., sending the data to your server.
    console.log({
      biography,
      file,
      useDefaultPfp
    });
  };

  return (
    <Wrapper>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 md:pt-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
            Edit your profile
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <input
                id="Biographry"
                name="Biographry"
                type="text"
                value={biography}
                placeholder="Biographry"
                onChange={(ev) => setBiography(ev.target.value)}
                className="block w-full rounded-md border-0 py-3 shadow-sm ring-1 ring-inset text-gray-800 ring-gray-700 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-md sm:leading-6"
            />
            {error && <label className="errorLabel">{error}</label>}
            <div className='w-full h-full'>
              <div className='h-full flex items-center justify-center'>
                <button
                  type = 'button'
                  className="w-[200px] py-2 text-lg rounded-md bg-primary text-md font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={imageButtonHandler}
                >
                  <div className='w-[200px] absolute'>Browse image</div>
                  <input className='update-btn' ref={imageButton} type="file" onChange={handleImageChange} accept="image/*" />
                </button>
              </div>
              {preview && <img className="update-img-preview" src={preview} alt="Preview" />}
            </div>
            <div>
              <input
                  type="checkbox"
                  checked={useDefaultPfp}
                  onChange={handleDefaultPfpChange}
                  className="checkbox mr-2"
                />
              <label>Use Default Profile Picture</label>
            </div>
            <button 
              type="submit" 
              className="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Submit Changes
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default ProfileUpdateForm;
