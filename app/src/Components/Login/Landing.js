import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../../context/LoggedInContext.js';
import Wrapper from '../Wrapper.js';

function Landing() {
  const { loggedIn, email } = useContext(LoggedInContext);
  const navigate = useNavigate()

  return (
    <Wrapper>
        <div className="mx-auto max-w-6xl pt-32 md:pt-52 xl:pt-72">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Framed Photographed, Right Photograph
            </h1>
            <p className="mt-6 m-auto max-w-3xl text-lg leading-8 text-gray-400">
              Discover Pixis, your ultimate destination for organizing, sharing, and cherishing your photographic memories. Our intuitive platform lets you effortlessly create stunning photo galleries, ensuring each snapshot is beautifully presented and easily accessible. Join Pixis today and transform the way you experience your photos!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-md bg-primary px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Create an account
              </button>
              {!loggedIn && 
                <button onClick={() => navigate("/login")} className="landing-button rounded-md text-md px-5 py-3 font-semibold leading-6 text-white">
                  Sign in <span aria-hidden="true">→</span>
                </button>
              }
              {loggedIn &&
                <button onClick={() => navigate(`/${email}`)} className="landing-button rounded-md text-md px-5 py-3 font-semibold leading-6">
                  Continue as <em>{email}</em>? <span aria-hidden="true">→</span>
                </button>
              }
            </div>
          </div>
        </div>
      </Wrapper>
  )
};

export default Landing;