import React, { useState } from "react";
import { apiConnector } from "../Services/apiConnector";
import { concernEndpoint, packageEndpoint, treatmentEndpoint } from "../Services/apis";
import { useDispatch, useSelector } from "react-redux";
import { clearAllConcerns,clearAllPackages,clearAllTreatments, setLoading, setRefresh } from "../Redux/Slices/concernSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";



const AddModal = () => {
  const dispatch = useDispatch();
  const allTreatements = useSelector((state) => state.concern.allTreatments);
  const loading = useSelector((state) => state.concern.loading);
  const [openModal, setOpenModal] = useState(null);
  const allConcerns = useSelector((state) => state.concern.allConcerns);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [concernData, setConcernData] = useState({ name: "", description: "" });
  const [treatmentData, setTreatmentDate] = useState({ name: "", description: "" });
  const [packageData, setPackageData] = useState({ name: "", price: "", description: "" });

  const closeModal = () => {
    setOpenModal(null);
    setSelectedConcerns([]);
    setSelectedTreatments([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(openModal === "concern") {
      dispatch(setLoading(true))
      const result = await apiConnector("POST",concernEndpoint.CREATE_CONCERN, concernData);
      dispatch(setLoading(false))
      toast.success(result?.data?.message || "Concern created successfully");
      setOpenModal(null)
      dispatch(clearAllConcerns())
      dispatch(setRefresh())
      setConcernData({ name: "", description: "" }); 
    }
    else if(openModal === "treatment") {

      if(selectedConcerns.length === 0) {
        alert("Please select at least one concern for the treatment.");
        return ;
      }
      const treatmentPayload = {
        name: treatmentData.name,
        description: treatmentData.description,
        concerns: selectedConcerns.map((c) => c._id),
      };
      dispatch(setLoading(true))
      const result = await apiConnector("POST", treatmentEndpoint.CREATE_TREATEMENT, treatmentPayload);
      dispatch(setLoading(false))
      toast.success(result?.data?.message || "Treatment created successfully");
      setOpenModal(null)
      dispatch(clearAllTreatments())
      dispatch(setRefresh())
      setTreatmentDate({ name: "", description: "" }); 

      setSelectedConcerns([]);
    }
    else{
      if(selectedTreatments.length === 0) {
        alert("Please select at least one treatment for the package.");
        return ;
      }
      const packagePayload = {
        name: packageData.name,
        price: packageData.price,
        description: packageData.description,
        treatments: selectedTreatments.map((t) => t._id),
      };
      dispatch(setLoading(true))
      const result = await apiConnector("POST",packageEndpoint.CREATE_PACKAGE, packagePayload);
      toast.success(result?.data?.message || "Package created successfully");
      dispatch(clearAllPackages())
      dispatch(setRefresh())
      setPackageData({ name: "", price: "", description: "" });
      setSelectedTreatments([])
      setOpenModal(null);
      dispatch(setLoading(false))
    }
  }

  const toggleConcern = (concern) => {
    if (selectedConcerns.find((c) => c._id === concern._id)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c._id !== concern._id));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const toggleTreatment = (treatment) => {
    if (selectedTreatments.find((t) => t._id === treatment._id)) {
      setSelectedTreatments(
        selectedTreatments.filter((t) => t._id !== treatment._id)
      );
    } else {
      setSelectedTreatments([...selectedTreatments, treatment]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 ">
      {loading && <Spinner/>}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setOpenModal("concern")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          ➕ Add Concern
        </button>
        <button
          onClick={() => setOpenModal("treatment")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700"
        >
          ➕ Add Treatment
        </button>
        <button
          onClick={() => setOpenModal("package")}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700"
        >
          ➕ Add Package
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {openModal === "concern" && "Add New Concern"}
              {openModal === "treatment" && "Add New Treatment"}
              {openModal === "package" && "Add New Package"}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Concern Form */}
              {openModal === "concern" && (
                <>
                  <input
                    type="text"
                    value={concernData.name}
                    name="name"
                    onChange={(e)=> setConcernData({ ...concernData, name: e.target.value })}
                    placeholder="Concern Name"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <textarea
                    value={concernData.description}
                    name="description"
                    onChange={(e) => setConcernData({ ...concernData, description: e.target.value })}
                    placeholder="Description"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </>
              )}

              {/* Treatment Form */}
              {openModal === "treatment" && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={treatmentData.name }
                    onChange={(e) => setTreatmentDate({ ...treatmentData, name: e.target.value })}
                    placeholder="Treatment Name"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <textarea
                    value={treatmentData.description }
                    name="description"
                    onChange={(e) => setTreatmentDate({ ...treatmentData, description: e.target.value })}
                    placeholder="Description (optional)"
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  {/* Concern Multi-Select */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Select Concerns
                    </label>
                    <div className="border rounded-lg p-2 flex flex-wrap gap-2">
                      {allConcerns?.map((concern) => (
                        <span
                          key={concern._id}
                          onClick={() => toggleConcern(concern)}
                          className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
                            selectedConcerns.find((c) => c._id === concern._id)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {concern.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedConcerns.map((c) => (
                        <span
                          key={c._id}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {c.name}
                          <button
                            type="button"
                            onClick={() => toggleConcern(c)}
                            className="text-red-500 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Package Form */}
              {openModal === "package" && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={packageData.name}
                    onChange={(e) => setPackageData({ ...packageData, name: e.target.value })}
                    placeholder="Package Name"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    name="price"
                    value={packageData.price}
                    onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
                    placeholder="Price"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <textarea
                    value={packageData.description}
                    name="description"
                    onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
                    placeholder="Description (optional)"
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  {/* Treatment Multi-Select */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Select Treatments
                    </label>
                    <div className="border rounded-lg p-2 flex flex-wrap gap-2">
                      {allTreatements?.map((treatment) => (
                        <span
                          key={treatment._id}
                          onClick={() => toggleTreatment(treatment)}
                          className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
                            selectedTreatments.find(
                              (t) => t._id === treatment._id
                            )
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {treatment.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTreatments.map((t) => (
                        <span
                          key={t._id}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {t.name}
                          <button
                            type="button"
                            onClick={() => toggleTreatment(t)}
                            className="text-red-500 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default AddModal;
