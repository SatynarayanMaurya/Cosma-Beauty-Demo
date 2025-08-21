import React, { useEffect } from 'react'
import AdminEnquiries from '../components/AdminEnquiry'
import AddModal from '../components/AddModal'
import AdminDataView from '../components/AdminDataView'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setAllEnquiries, setLoading } from '../Redux/Slices/concernSlice'
import { apiConnector } from '../Services/apiConnector'
import { enquiryEndpoint } from '../Services/apis'

function Admin() {

  const dispatch = useDispatch();
  const allEnquiries = useSelector((state)=>state.concern.allEnquiries)

  const getAllEnquiries = async () => {
    try {
      if(allEnquiries) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",enquiryEndpoint.GET_ALL_ENQUIRY)
      dispatch(setAllEnquiries(result?.data?.allEnquires))
      dispatch(setLoading(false))
    }
    catch (error) {
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message ||error?.message || "Error fetching enquiries");
      console.error("Error fetching enquiries:", error);
    }
  }

  useEffect(()=>{
    getAllEnquiries()
  },[])

  return (
    <div>
      <AddModal/>
      <AdminEnquiries/>
      <AdminDataView/>
    </div>
  )
}

export default Admin
