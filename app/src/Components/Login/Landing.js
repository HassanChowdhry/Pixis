import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoggedInContext } from '../../context/LoggedInContext.js';

function Landing() {
  const { loggedIn, email } = useContext(LoggedInContext);
  const navigate = useNavigate()

  return (
    <div className="isolate px-6 pt-6 lg:px-8 overflow-y-hidden">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80d7ff] to-[#261e93] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
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
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[650/250] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80d7ff] to-[#261e93] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
  )
};

export default Landing;