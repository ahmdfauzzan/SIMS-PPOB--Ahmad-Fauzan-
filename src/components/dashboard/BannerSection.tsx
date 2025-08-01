import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBanners } from "../../services/dashboardService";

const BannersSection: React.FC = () => {
  const { data: bannersData, isLoading, error } = useBanners();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Temukan promo menarik
        </h3>
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-40 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !bannersData?.data || bannersData.data.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Temukan promo menarik
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">Tidak ada banner promo saat ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Temukan promo menarik
      </h3>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bannersData.data.map((banner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                console.log("Banner clicked:", banner.banner_name);
              }}
            >
              <img
                src={banner.banner_image}
                alt={banner.banner_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/320x160/dc2626/ffffff?text=${encodeURIComponent(
                    banner.banner_name
                  )}`;
                }}
              />
            </div>
          ))}
        </div>

        {bannersData.data.length > 1 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BannersSection;
