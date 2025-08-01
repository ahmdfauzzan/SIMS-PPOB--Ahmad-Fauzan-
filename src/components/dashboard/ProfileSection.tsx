import React from "react";
import { useProfile } from "../../services/dashboardService";

const ProfileSection: React.FC = () => {
  const { data: profileData, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!profileData?.data) {
    return (
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Selamat datang,</p>
          <h1 className="text-2xl font-bold text-gray-900">User</h1>
        </div>
      </div>
    );
  }

  const { first_name, last_name, profile_image } = profileData.data;

  return (
    <div className="flex items-center space-x-4 mb-8">
      <img
        src={profile_image}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${first_name}+${last_name}&background=dc2626&color=fff&size=64`;
        }}
      />
      <div>
        <p className="text-gray-600 text-sm">Selamat datang,</p>
        <h1 className="text-2xl font-bold text-gray-900">
          {first_name} {last_name}
        </h1>
      </div>
    </div>
  );
};

export default ProfileSection;
