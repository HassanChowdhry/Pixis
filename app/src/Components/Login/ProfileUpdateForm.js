import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Wrapper from '../Wrapper.js';
import { LoggedInContext } from '../../context/LoggedInContext.js';
import photo from '../../Images/picture.png';
import "./Login.css";

const ProfileUpdateForm = (props) => {
  const [biography, setBiography] = useState('');
  const [file, setFile] = useState(photo);
  const [preview, setPreview] = useState(photo);
  const [useDefaultPfp, setUseDefaultPfp] = useState(false);
  const [error, setError] = useState('');
  const imageButton = useRef();
  const { email } = useContext(LoggedInContext);
  const navigate = useNavigate();


  const imageButtonHandler = () => {
    imageButton.current.click();
  }

  const removePhoto = () => {
    setFile(photo);
    setPreview(photo);
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
      setFile(photo);
      setPreview(photo);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email) {
      window.alert("Please log in first");
      return
    }

    if (!biography) {
      setError('Biography is required');
      return;
    }
    setError('');

    await updateProfile();
  };

  const updateProfile = async () => {    
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('bio', biography);
    formData.append('email', email);

    fetch(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/user_data/${email}`, {
      method: "PUT",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      navigate(`/${email}`)
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};

  return (
    <Wrapper>
      <section className='h-[800px] w-[960px] m-auto flex align-middle rounded-md mt-[100px]'>
        <div className='absolute w-[960px] text-center border-b-[1px] border-gray-600'>
          <h2 className='p-2 text-xl font-bold tracking-tight'> Complete your profile </h2>    
        </div>
        <form className='photo-form h-[800px]' onSubmit={handleSubmit}>
          <div className='flex flex-row-reverse w-[960px] h-[758px] mt-[44px]'>
            <div className='w-2/5 p-3 space-y-5'>
              <textarea
                  id="bio"
                  name="bio"
                  type="text"
                  value={biography}
                  placeholder="Write bio..."
                  rows={6}
                  onChange={(ev) => setBiography(ev.target.value)}
                  className="block w-full rounded-md resize-none border-b-2 focus:border-gray-400 bg-transparent shadow-sm focus:ring-transparent sm:text-md sm:leading-6"
                />
                {error && <label className="errorLabel">{error}</label>}
                <div>
                  <input
                      type="checkbox"
                      checked={useDefaultPfp}
                      onChange={handleDefaultPfpChange}
                      className="checkbox mr-2"
                    />
                  <label>Use Default Profile Picture</label>
                </div>
              {preview !== photo &&                 
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
                Complete Changes
              </button>
            </div>
            <div className='w-3/5 h-full z-2'>
                <img className='my-5 m-auto rounded-full h-80 w-80 cover-full' src={preview ?? photo} alt="Preview" />
                <div className='h-auto flex my-5 justify-center'>
                  <button
                    type = 'button'
                    className="w-[200px] py-2 text-lg rounded-md bg-primary text-md font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={imageButtonHandler}
                  >
                    <div className='w-[200px] absolute'>Browse image</div>
                    <input className='upload-btn' ref={imageButton} type="file" onChange={handleImageChange} accept="image/*" />
                  </button>
                </div>
              
            </div>
          </div>
        </form>
      </section>
    </Wrapper>


    // <Wrapper>
    //   <div className="min-h-full justify-center px-6 md:pt-10 lg:px-8">
    //     <div className='flex flex-col h-[800px] w-[960px] m-auto align-middle bg-[#282c34] rounded-md'>
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //       <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
    //         Complete your profile
    //       </h2>
    //     </div>
    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-[800px]">
    //       <form className="space-y-6">
    //       <div className='flex flex-row h-[758px]'>
    //         <section>
    //           <textarea
    //               id="bio"
    //               name="bio"
    //               type="text"
    //               value={biography}
    //               placeholder="Write bio..."
    //               rows={6}
    //               onChange={(ev) => setBiography(ev.target.value)}
    //               className="block w-full rounded-md resize-none border-b-2 focus:border-gray-400 bg-transparent shadow-sm focus:ring-transparent sm:text-md sm:leading-6"
    //             />
    //             {error && <label className="errorLabel">{error}</label>}
    //           <div>
    //             <input
    //                 type="checkbox"
    //                 checked={useDefaultPfp}
    //                 onChange={handleDefaultPfpChange}
    //                 className="checkbox mr-2"
    //               />
    //             <label>Use Default Profile Picture</label>
    //           </div>
    //           <button 
    //             type="submit" 
    //             className="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    //           >
    //             Submit Changes
    //           </button>
    //         </section>

    //         <section>
    //           <div className='w-full h-full'>
    //             <div className='h-full flex items-center justify-center'>
    //               <button
    //                 type = 'button'
    //                 className="w-[200px] py-2 text-lg rounded-md bg-primary text-md font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    //                 onClick={imageButtonHandler}
    //               >
    //                 <div className='w-[200px] absolute'>Browse image</div>
    //                 <input className='update-btn' ref={imageButton} type="file" onChange={handleImageChange} accept="image/*" />
    //               </button>
    //             </div>
    //             {preview && 
    //               <img className='m-auto rounded-full h-80 w-80 cover-full' src={preview} alt="Preview" />
    //             }
    //           </div>
    //         </section>
    //       </div>
    //       </form>
    //     </div>
    //     </div>
    //   </div>
    // </Wrapper>
  );
}

export default ProfileUpdateForm;
