/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// COMPONENTS
import Login from '../../Auth/Login';
import Signup from '../../Auth/Signup';
import ForgotPassword from '../../Auth/ForgotPassword';
import ResetPassword from '../../Auth/ResetPassword';

// ----------------------------------------------------------------------------------
// ----------------------------------- AUTH MODAL -----------------------------------
// ----------------------------------------------------------------------------------

const AuthModal = ({ open, setOpen, authPage, setAuthPage }) => {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full align-middle rounded-lg text-left overflow-hidden transform transition-all max-w-2xl sm:w-full">
              {authPage === 'login' ? (
                <Login setAuthPage={setAuthPage} setOpenAuth={setOpen} />
              ) : authPage === 'signup' ? (
                <Signup setAuthPage={setAuthPage} setOpenAuth={setOpen} />
              ) : authPage === 'forgot_password' ? (
                <ForgotPassword setAuthPage={setAuthPage} setOpenAuth={setOpen} />
              ) : authPage === 'reset_password' ? (
                <ResetPassword setAuthPage={setAuthPage} />
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AuthModal;