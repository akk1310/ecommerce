import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { UserIcon, EnvelopeIcon, BuildingStorefrontIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const AdminProfile = ({ token }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/adminprofile`, {
          headers: { token },
        });

        if (data.success) {
          setAdmin(data.admin);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    if (token) fetchAdmin();
  }, [token]);

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-12">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{admin.name}</h2>
          <p className="text-gray-500 text-sm">Store Administrator</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
            <span className="text-gray-700">{admin.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BuildingStorefrontIcon className="h-5 w-5 text-green-500" />
            <span className="text-gray-700">{admin.storeName}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDaysIcon className="h-5 w-5 text-purple-500" />
            <span className="text-gray-700">
              Joined {new Date(admin.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
