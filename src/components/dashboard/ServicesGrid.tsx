import React from "react";
import { useServices } from "../../services/dashboardService";

const ServicesGrid: React.FC = () => {
  const { data: servicesData, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !servicesData?.data) {
    return (
      <div className="mb-8">
        <div className="text-center py-8">
          <p className="text-gray-500">Gagal memuat layanan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
        {servicesData.data.map((service) => (
          <button
            key={service.service_code}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors group"
            onClick={() => {
              console.log("Service clicked:", service.service_name);
              // TODO: Navigate to payment page
            }}
          >
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-2 group-hover:border-red-300 transition-colors">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">${service.service_name.charAt(
                      0
                    )}</div>`;
                  }
                }}
              />
            </div>
            <span className="text-xs text-gray-700 text-center leading-tight">
              {service.service_name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
