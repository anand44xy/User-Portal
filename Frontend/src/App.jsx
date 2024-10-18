import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Function for Toastify
  const openToast = (msg, flag) => {
    toast(msg, { type: flag ? 'success' : 'error' });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/");
      if (response.data.statusType === 1) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // submitHandler for Submit Button/Register user
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      password: e.target.password.value
    };

    try {
      let response;
      if (editUser === null) {
        response = await axios.post("http://localhost:5000/user/register", data);
      } else {
        response = await axios.patch(`http://localhost:5000/user/update/${editUser._id}`, data);

      }

      if (response.status === 201 || response.data.statusType === 1) {
        e.target.reset();  // Reset the form after successful submission
        setEditUser(null); // Clear the form after editing
        fetchUsers();      // Refresh the user list
        openToast('User Registered Successfully✅', true);
      } else {
        openToast(response.data.msg, false);
      }
    } catch (error) {
      console.log(error);
      openToast('Error registering user⚠️', false);
    }
  };

  // deleteHandler for delete User
  const deleteHandler = async (user_id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/delete/${user_id}`);
      if (response.data.statusType === 1) {
        fetchUsers(); // Fetch updated user list
        openToast(response.data.msg, true);
      } else {
        openToast(response.data.msg, false);
      }
    } catch (error) {
      console.log('Error deleting user:', error);
      openToast('Error deleting user⚠️', false);
    }
  };


  // changeStatusHandler for Active/Inactive
  const changeStatusHandler = async (user_id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/user/update/${user_id}`);
      if (response.data.statusType === 1) {
        fetchUsers(); // Fetch updated user list
        openToast(response.data.msg, true);
      } else {
        openToast(response.data.msg, false);
      }
    } catch (error) {
      console.log('Error changing user status:', error);
      openToast('Error changing user status⚠️', false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="container mx-auto p-4 mt-5 flex flex-col md:flex-row">
        {/* User Dashboard table Section */}
        <div className="relative overflow-x-auto w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-blue-500 text-center md:text-left">User Dashboard</h1>
          <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Contact</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">DELETE</th>
                <th scope="col" className="px-6 py-3">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {user.name} </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.contact}</td>
                  <td className="px-6 py-4">
                    {user.statusType
                      ? <button onClick={() => changeStatusHandler(user._id)} className="bg-green-400 p-1">Active</button>
                      : <button onClick={() => changeStatusHandler(user._id)} className="bg-red-400 p-1">Inactive</button>
                    }
                  </td>

                  <td className="px-6 py-4">
                    <button onClick={() => deleteHandler(user._id)} className="hover:text-red-600 ml-4">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setEditUser(user)} className="hover:text-blue-600 ml-2">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Register User Section */}
        <RegisterForm submitHandler={submitHandler} editUser={editUser} />
      </div>
    </>
  );
}

const RegisterForm = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div className=" w-full md:w-1/3 p-6 md:ml-5">
      <h2 className="text-2xl mt-3 font-bold mb-4 text-blue-500">Register User</h2>
      <form onSubmit={props.submitHandler} className="space-y-4">
        <div>
          <label className="block mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={props.editUser?.name}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={props.editUser?.email}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            defaultValue={props.editUser?.contact}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <input
              type={togglePassword ? 'text' : 'password'}
              id="password"
              name="password"
              defaultValue={props.editUser?.password}
              required
              className="w-full p-2 outline-none "
              pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}"
              title="Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@$!%*#?&)"
            />
            <button type="button" onClick={() => setTogglePassword(!togglePassword)} className="p-2">
              <i className={`fa-regular ${togglePassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>
        <button type="submit" className="w-full rounded-md bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
