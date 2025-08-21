
export default function PackageList({ packages, onEnquire }) {
  if (!packages?.length) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">💎 Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between"
          >
            {/* Package Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {pkg.name}
              </h3>
              {pkg.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {pkg.description}
                </p>
              )}

              {/* Treatments Badges */}
              {pkg.treatments?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {pkg.treatments.map((treat, idx) => (
                    <span
                      key={idx}
                      className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200"
                    >
                      {treat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-5">
              <span className="text-lg font-bold text-pink-600">
                ₹{pkg.price}
              </span>
              <button
                onClick={() => onEnquire(pkg)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow hover:from-pink-600 hover:to-pink-700 transition"
              >
                Enquire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}









// export default function PackageList({ packages, onEnquire }) {
//   if (!packages?.length) return null;

//   return (
//     <div className="max-w-3xl mx-auto my-6">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800">Packages</h2>
//       <div className="grid grid-cols-1 gap-4">
//         {packages?.map((pkg) => (
//           <div
//             key={pkg._id}
//             className="bg-white border rounded-xl shadow-md p-4 flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
//               <p className="text-sm text-gray-600">{pkg.description}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="font-bold text-pink-600">₹{pkg.price}</span>
//               <button
//                 onClick={() => onEnquire(pkg)}
//                 className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600"
//               >
//                 Enquire
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
