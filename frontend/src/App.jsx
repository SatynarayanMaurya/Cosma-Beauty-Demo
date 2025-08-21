import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { setAllConcerns, setAllPackages, setAllTreatements, setLoading } from "./Redux/Slices/concernSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import { apiConnector } from "./Services/apiConnector";
import { concernEndpoint, packageEndpoint, treatmentEndpoint } from "./Services/apis";

export default function App() {

  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.concern.refresh);
  const allConcerns = useSelector((state) => state.concern.allConcerns);
  const allTreatments = useSelector((state) => state.concern.allTreatments);
  const allPackages = useSelector((state) => state.concern.allPackages);
  const loading = useSelector((state) => state.concern.loading);

  const getAllConcerns = async () => {
    try {
      if(allConcerns && allPackages && allTreatments) return; // If concerns are already fetched, skip the API call
      dispatch(setLoading(true));
      const result = await apiConnector("GET",concernEndpoint.GET_CONCERN)
      const res = await apiConnector("GET", treatmentEndpoint.GET_ALL_TREATMENT);
      const response = await apiConnector("GET", packageEndpoint.GET_ALL_PACKAGE);
      dispatch(setAllTreatements(res?.data?.allTreatements));
      dispatch(setAllPackages(response?.data?.allPackages));
      dispatch(setAllConcerns(result?.data?.allConcern));
      dispatch(setLoading(false));
      
    }
    catch (error) {
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message ||error.message || "Failed to fetch concerns");
      console.error("Error fetching concerns:", error);
    }
  }

  useEffect(()=>{
    getAllConcerns();
  },[refresh])


  return (
    <div>
      {loading && <Spinner /> }
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Header / Navbar */}
          <header className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
              <Link to="/" className="text-pink-600 text-xl font-bold">
                Cosma Beauty
              </Link>
              <nav className="flex gap-4 font-semibold">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-pink-600 transition"
                >
                  Home
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-pink-600 transition"
                >
                  Admin
                </Link>
              </nav>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Cosma Beauty Demo
          </footer>
        </div>
      </Router>
    </div>
  );
}
