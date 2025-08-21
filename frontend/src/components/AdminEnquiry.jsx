import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminEnquiries() {

    const enquiries =  useSelector((state)=>state.concern.allEnquiries)



  return (
    <div className="p-6 bg-gray-50 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📋 Admin Dashboard – Enquiries
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white ">
            <tr>
              <th className="p-3 text-left  w-[3vw]">#</th>
              <th className="py-3 text-left  w-[10vw]">Name</th>
              <th className="py-3 text-left  w-[15vw]">Email</th>
              <th className="py-3 text-left   w-[10vw]">Concern</th>
              <th className="py-3 text-left   w-[10vw]">Treatment</th>
              <th className="py-3 text-left  w-[15vw]">Package</th>
              <th className="py-3 text-left   w-[15vw]">Message</th>
              <th className="py-3 text-left   w-[8vw]">Date</th>
            </tr>
          </thead>
          <tbody >
            {enquiries?.length > 0 ? (
              enquiries?.map((enquiry, idx) => (
                <tr
                  key={enquiry._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3 w-[3vw]">{idx + 1}.</td>
                  <td className="py-3 w-[10vw] whitespace-nowrap overflow-x-scroll equiryName-scrollbar">{enquiry?.name}</td>
                  <td className="py-3 w-[15vw]">{enquiry?.email}</td>
                  <td className="py-3 text-blue-600 font-medium w-[10vw]">
                    {enquiry?.concern?.name}
                  </td>
                  <td className="py-3 w-[10vw]">{enquiry?.treatment?.name}</td>
                  <td className="py-3 font-semibold text-green-700 w-[10vw]  whitespace-nowrap overflow-x-scroll equiryName-scrollbar">
                    {enquiry?.package?.name}
                  </td>
                  <td className="py-3  text-gray-600 w-[20vw] max-w-[20vw]  whitespace-nowrap overflow-x-scroll  equiryName-scrollbar">{enquiry?.message}</td>
                  <td className="py-3 text-gray-600 px-4 w-[8vw]">{enquiry?.createdAt?.slice(0,10)?.split("-")?.reverse()?.join("-")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
