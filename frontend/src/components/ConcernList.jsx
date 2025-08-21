
import { AlertCircle } from "lucide-react";

export default function ConcernList({ concerns }) {
  if (!concerns?.length) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">🌿 Concerns</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerns.map((con, i) => (
          <li
            key={i}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                {con.name}
              </h3>
            </div>

            {con.description ? (
              <p className="text-sm text-gray-600 line-clamp-3">
                {con.description}
              </p>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No description available
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}







// export default function ConcernList({ concerns }) {
//   if (!concerns?.length) return null;

//   return (
//     <div className="max-w-3xl mx-auto my-6">
//       <h2 className="text-xl font-semibold mb-3 text-gray-800">Concerns</h2>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         {concerns?.map((treat, i) => (
//           <li
//             key={i}
//             className="bg-white border rounded-xl shadow-sm p-3 text-gray-700"
//           >
//             {treat.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


