import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.post(
        backendUrl + "/api/user/profile",
        {},
        { headers: { token } }
      )
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
          setNewName(res.data.user.name); // set initial form value
        }
      })
      .catch(err => console.log(err));
    }
  }, [token, backendUrl]);

  const handleUpdate = () => {
    if (!newName.trim()) return;
    setLoading(true);
    axios.post(
      backendUrl + "/api/user/update",
      { name: newName },
      { headers: { token } }
    )
    .then(res => {
      if (res.data.success) {
        setUser(res.data.user);
        setEditMode(false);
      }
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          {user.name.charAt(0)}
        </div>

        {editMode ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        ) : (
          <h1 className="text-3xl font-bold mt-4 text-gray-800">{user.name}</h1>
        )}
        
        <p className="text-gray-500">{user.email}</p>

        <div className="mt-6 space-y-3 text-left">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-gray-800 font-medium break-all">{user._id}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="text-gray-800 font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {editMode ? (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:scale-105 transform transition duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
