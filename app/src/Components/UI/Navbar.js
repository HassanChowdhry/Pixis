// import {
  //   Disclosure,
  //   DisclosureButton,
  //   DisclosurePanel,
  //   Menu,
  //   MenuButton,
  //   MenuItem,
  //   MenuItems,
  //   Transition,
  // } from '@headlessui/react'
  // import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { Disclosure } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { LoggedInContext } from '../../context/LoggedInContext.js';
import logo from "../../Images/pixis.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoggedInContext)
  const onLogOutHandler = () => {
    sessionStorage.removeItem('user');
    setLoggedIn(false)
    navigate("/");
}

  return (
    <Disclosure as="nav" className="bg-transparent w-full fixed inset-x-0 top-0 z-50">
      {({ open }) => (
        <>
          <div className="flex mx-auto justify-between h-24 items-center max-w-[90rem] p-4 sm:px-6 lg:px-8">
              <div>
                  <img className='h-16 p-2 cursor-pointer' src={logo} alt='logo' onClick={() => navigate("/")} />
              </div>
              <div>
                <button 
                  type='button'
                  className='text-gray-300 h-14 bg-gray-900 hover:bg-gray-700 hover:text-white rounded-xl px-6 py-2 text-lg font-bold'
                  onClick={onLogOutHandler}
                >
                  Sign Out
                </button>
              </div>
          </div>

        </>
      )}
    </Disclosure>
  )
}

/* Profile dropdown
<Menu as="div" className="relative ml-3">
  <div>
    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
      <span className="absolute -inset-1.5" />
      <span className="sr-only">Open user menu</span>
      <img
        className="h-8 w-8 rounded-full"
        src=""
        alt=""
      />
    </MenuButton>
  </div>
  <Transition
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <MenuItem>
        {({ focus }) => (
          <a
            href="#"
            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Your Profile
          </a>
        )}
      </MenuItem>
      <MenuItem>
        {({ focus }) => (
          <a
            href="#"
            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Settings
          </a>
        )}
      </MenuItem>
      <MenuItem>
        {({ focus }) => (
          <a
            href="#"
            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Sign out
          </a>
        )}
      </MenuItem>
    </MenuItems>
  </Transition>
</Menu> */
/* <DisclosurePanel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
    {navigation.map((item) => (
      <DisclosureButton
        key={item.name}
        as="a"
        href={item.href}
        className={classNames(
          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'block rounded-md px-3 py-2 text-base font-medium'
        )}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name}
      </DisclosureButton>
    ))}
  </div>
</DisclosurePanel> */