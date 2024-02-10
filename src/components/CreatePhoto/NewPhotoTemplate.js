import { useState, useEffect } from 'react';
import '../Gallery/Image.css'; 
import Image from '../Gallery/Image.js';
import CreateModal from '../CreatePhoto/CreateModal.js';

function NewPhotoTemplate() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    
    } else {
      document.body.style.overflow = 'scroll';
    }

  }, [modal ]);

  return (
    <div className="box">
      <Image
          src={"https://static.thenounproject.com/png/2796180-200.png"}
          alt={"test"}
          location={"last photo"}
          onClick={toggleModal}
        >
      </Image>

      {modal && (
      <CreateModal
        onClick={toggleModal}
      />
    )}
    </div>
  )
};

export default NewPhotoTemplate;