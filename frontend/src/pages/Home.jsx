import { use, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TreatmentList from "../components/TreatmentList";
import PackageList from "../components/PackageList";
import EnquiryForm from "../components/EnquiryForm";
import { treatments, packages } from "../Utils/data";
import { useDispatch, useSelector } from "react-redux";
import ConcernList from "../components/ConcernList";
import { clearAllEnquiries, setLoading } from "../Redux/Slices/concernSlice";
import { apiConnector } from "../Services/apiConnector";
import { enquiryEndpoint } from "../Services/apis";
import { toast } from "react-toastify";
export default function Home() {

  const dispatch = useDispatch();
  const allTreatments = useSelector((state) => state.concern.allTreatments);
  const allPackages = useSelector((state) => state.concern.allPackages);
  const allConcerns = useSelector((state) => state.concern.allConcerns);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterConcern, setFilterConcern] = useState([]);
  const [filterTreatment, setFilterTreatment] = useState([]);
  const [filterPackage, setFilterPackage] = useState([]);

  useEffect(() => {
    // 1️⃣ Filter concerns by searchQuery
    const filterData = allConcerns?.filter((con) =>
      con?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterConcern(filterData);

    // 2️⃣ Collect concern IDs
    const concernIds = filterData?.map((c) => c._id);

    // 3️⃣ Filter treatments based on concernIds
    const filterTreatments = allTreatments?.filter((treat) =>
      treat?.concerns?.some((con) => concernIds.includes(con._id))
    );
    setFilterTreatment(filterTreatments);

    // 4️⃣ Collect treatment IDs
    const treatmentIds = filterTreatments?.map((t) => t._id);

    // 5️⃣ Filter packages based on treatmentIds
    const filterPackages = allPackages?.filter((pack) =>
      pack?.treatments?.some((treatId) => treatmentIds.includes(treatId?._id))
    );
    setFilterPackage(filterPackages);

  }, [searchQuery, allConcerns, allTreatments, allPackages]);


  const handleSearch = async (query) => {
    console.log("Submit search: ",query)
    setSearchQuery(query)
  };

  const handleSubmitEnquiry = async (data) => {
    try{
      console.log("Enquiry data submitted: ", data);
      setSelectedPkg(null);
      dispatch(setLoading(true))
      const result = await apiConnector("POST",enquiryEndpoint.CREATE_ENQUIRY, data);
      toast.success(result?.data?.message || "Enquiry submitted successfully");
      dispatch(clearAllEnquiries())
      dispatch(setLoading(false))
      
      
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error?.message || "Failed to submit enquiry");
      console.error("Error submitting enquiry: ", error); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center text-pink-600 my-6">
        Cosma Beauty Finder
      </h1>
      <SearchBar onSearch={handleSearch}  searchQuery={(e)=>setSearchQuery(e.target.value)} searchQueryValue={searchQuery} />
      <ConcernList concerns={filterConcern}/>
      <TreatmentList treatments={filterTreatment} />
      <PackageList packages={filterPackage} onEnquire={(pkg) => setSelectedPkg(pkg)} />
      <EnquiryForm
        pkg={selectedPkg}
        onSubmit={(data)=>handleSubmitEnquiry(data)}
        onClose={() => setSelectedPkg(null)}
      />
    </div>
  );
}
