"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import UserList from "./UserList";
import axios from "axios";
import { toast } from "react-toastify";

const Adduser = () => {
  const USER_API_BASR_URL = "http://localhost:8080/api/v1/users";
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };


  const saveUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(USER_API_BASR_URL, user, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200 || response.status === 201) { // Handle success codes
        const _user = response.data; // Access the saved user data from response
        setResponseUser(_user);
        reset(e); 
        toast.success('User Added successfully!'); // Optional success message
      } else {
        toast.error('API request failed:', response); // Handle unexpected errors
      }
    } catch (error) {
      toast.error('Error saving user:', error); // Handle network or other errors
    }
  };
  

  const reset = (e) => {
    e.preventDefault();
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-amber-700 hover:bg-amber-800 hover:scale-105 text-white px-6 py-2 font-semibold"
          >
            Add User
          </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed pt-14 backdrop-blur-sm bg-black/50 inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#131314] shadow-xl rounded">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-400"
                  >
                    Add new User
                  </Dialog.Title>
                  <div className="flex max-w-md max-auto">
                    <div className="py-2">
                      <div className="h-14 my-4 mt-3">
                        <label className="block text-gray-500 text-sm font-normal">
                          First Name
                        </label>
                        <input
                          onChange={(event) => handleChange(event)}
                          type="text"
                          name="firstName"
                          className="h-10 bg-[#3d3f42] text-slate-300  w-96 rounded-lg border mt-2 px-2 py-2"
                          value={user.firstName}
                        ></input>
                      </div>

                      <div className="h-14 my-4 mt-3">
                        <label className="block text-gray-500 text-sm font-normal">
                          Last Name
                        </label>
                        <input
                          onChange={(event) => handleChange(event)}
                          type="text"
                          name="lastName"
                          className="h-10 bg-[#3d3f42] text-slate-300  w-96 rounded-lg border mt-2 px-2 py-2"
                          value={user.lastName}
                        ></input>
                      </div>

                      <div className="h-14 my-4 mt-3">
                        <label className="block text-gray-500 text-sm font-normal">
                          Email
                        </label>
                        <input
                          onChange={(event) => handleChange(event)}
                          type="email"
                          name="emailId"
                          className="h-10 bg-[#3d3f42] text-slate-300  w-96 rounded-lg border mt-2 px-2 py-2"
                          value={user.emailId}
                        ></input>
                      </div>

                      <div className="h-14 my-4 space-x-4 pt-4 flex items-center justify-center">
                        <button
                          onClick={saveUser}
                          className="rounded text-white font-semibold bg-green-400 hover:bg-green-900 py-2 px-6"
                        >
                          Add
                        </button>
                        <button
                          onClick={reset}
                          className="rounded text-white font-semibold bg-red-600 hover:bg-red-900 py-2 px-6"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <UserList user={responseUser} />
      </div>
    </>
  );
};

export default Adduser;
