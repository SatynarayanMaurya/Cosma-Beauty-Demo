



export default function TreatmentList({ treatments }) {
  if (!treatments?.length) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">✨ Treatments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treat, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {treat.name}
            </h3>

            {/* Concerns as badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {treat.concerns.map((c, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                >
                  {c.name}
                </span>
              ))}
            </div>

            {/* Optional description */}
            {treat.description ? (
              <p className="text-sm text-gray-600 line-clamp-3">
                {treat.description}
              </p>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No description available
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}





// export default function TreatmentList({ treatments }) {
//   if (!treatments?.length) return null;

//   return (
//     <div className="max-w-3xl mx-auto my-6">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800">Treatments</h2>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         {treatments.map((treat, i) => (
//           <li
//             key={i}
//             className="bg-white border rounded-xl shadow-sm p-3 text-gray-700"
//           >
//             {treat.name} <span className="font-semibold">({treat.concerns.map((c) => c.name).join(", ")})</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
