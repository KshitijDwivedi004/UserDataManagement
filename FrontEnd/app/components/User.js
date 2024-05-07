import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const User = ({ user, deleteUser, editUser }) => {
  return (
    <tr key={user.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">{user.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">{user.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">{user.emailId}</div>
      </td>
      <td className=" px-6 py-4 whitespace-nowrap flex justify-around">
        <a
          onClick={(e, id) => editUser(e, user.id)}
          className="text-indigo-600 px-4  hover:text-indigo-800 hover:cursor-pointer"
        >
          {/* Edit */}
          <FaEdit className="text-green-300 hover:text-green-500 text-xl" />
        </a>
        <a
          onClick={(e, id) => deleteUser(e, user.id)}
          className="text-indigo-600  hover:text-indigo-800 hover:cursor-pointer"
        >
          {/* Delete */}
          <MdDelete className="text-red-600 hover:text-red-800 text-xl" />
        </a>
      </td>
    </tr>
  );
};

export default User;
