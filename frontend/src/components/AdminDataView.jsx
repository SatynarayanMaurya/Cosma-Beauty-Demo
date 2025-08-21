import React, { useState } from "react";
import { ChevronDown, ChevronRight, Package, Stethoscope } from "lucide-react";
import { useSelector } from "react-redux";

const AdminDataView = () => {
    const concerns = useSelector((state) => state.concern.allConcerns);
    const treatments = useSelector((state) => state.concern.allTreatments);
    const packages = useSelector((state) => state.concern.allPackages);

  const [openConcern, setOpenConcern] = useState(null);
  const [openTreatment, setOpenTreatment] = useState(null);

  const toggleConcern = (id) => {
    setOpenConcern(openConcern === id ? null : id);
    setOpenTreatment(null);
  };

  const toggleTreatment = (id) => {
    setOpenTreatment(openTreatment === id ? null : id);
  };

  return (
    <div className="p-6 bg-gray-50 ">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Admin Data View
      </h1>

      <div className="space-y-4">
        {concerns?.map((concern) => (
          <div
            key={concern._id}
            className="bg-white shadow rounded-2xl overflow-hidden"
          >
            {/* Concern Header */}
            <div
              onClick={() => toggleConcern(concern._id)}
              className="flex items-center justify-between cursor-pointer px-4 py-3 hover:bg-gray-100 transition"
            >
              <h2 className="font-semibold text-lg text-gray-700">
                {concern.name}
              </h2>
              {openConcern === concern._id ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </div>

            {/* Treatments */}
            {openConcern === concern._id && (
              <div className="px-6 py-4 bg-gray-50 border-t space-y-3">
                {treatments
                  ?.filter((t) => t.concerns?.some((c)=>c?._id===openConcern))
                  ?.map((treatment) => (
                    <div
                      key={treatment._id}
                      className="bg-white shadow-sm rounded-lg"
                    >
                      <div
                        onClick={() => toggleTreatment(treatment._id)}
                        className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">
                            {treatment.name}
                          </span>
                        </div>
                        {openTreatment === treatment._id ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </div>

                      {/* Packages */}
                      {openTreatment === treatment._id && (
                        <div className="px-4 py-3 space-y-3">
                          {packages
                            .filter((p) => p.treatments?.some((t) => t._id === openTreatment))
                            ?.map((pkg) => (
                              <div
                                key={pkg._id}
                                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Package className="w-4 h-4 text-green-500" />
                                  <h4 className="font-medium text-gray-800">
                                    {pkg.name}
                                  </h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {pkg.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  💰 ₹{pkg.price} 
                                </p>
                              </div>
                            ))}

                          {packages.filter((p) =>
                            p.treatments?.some((t) => t._id === openTreatment)
                          ).length === 0 && (
                            <p className="text-sm text-gray-500 italic">
                              No packages available for this treatment.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                {treatments?.filter((t) => t.concerns?.some((c)=>c?._id===openConcern))
                  .length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No treatments available for this concern.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDataView;
