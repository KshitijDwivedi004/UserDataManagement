"use client";
import React, { useEffect, useState } from "react";
import User from "./User";
import EditUser from "./EditUser";
import axios from 'axios';
import { toast } from "react-toastify";

const UserList = ({ user }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {

      const response =await axios.get(USER_API_BASE_URL);
      const users = response.data

      setUsers(users);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log("Database Error " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, responseUser]);


const deleteUser = async (e, id) => {
  e.preventDefault();

  try {
    const response = await axios.delete(`${USER_API_BASE_URL}/${id}`);

    if (response.status === 200 || response.status === 204) { // Handle success codes
      if (users) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
      toast.success('User deleted successfully!'); // Optional success message
    } else {
      toast.error('API request failed:', response); // Handle unexpected errors
    }
  } catch (error) {
    toast.error('Error deleting user:', error); // Handle network or other errors
  }
};


  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  };

  return (
    <div>
      <div className="container mx-auto my-8 ">
        <div className="flex mx-auto max-w-full shadow border-b">
          <div className="w-full overflow-x-auto">
            {isError && (
              <div className="text-red-500 text-center">
                <p>Error in fetching data from database</p>
                <br />
                <br />
              </div>
            )}
            <table className="min-w-full lg:w-[70rem]">
              <thead className="bg-[#4f4f62]">
                <tr>
                  <th className="text-left font-medium text-gray-400 uppercase tracking-wide py-3 px-6">
                    First Name
                  </th>
                  <th className="text-left font-medium text-gray-400 uppercase tracking-wide py-3 px-6">
                    Last Name
                  </th>
                  <th className="text-left font-medium text-gray-400 uppercase tracking-wide py-3 px-6">
                    Email Id
                  </th>
                  <th className="text-right font-medium text-gray-400 uppercase tracking-wide py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#212125]">
                {users?.map((user) => (
                  <User
                    user={user}
                    key={user.id}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
    </div>
  );
};

export default UserList;
