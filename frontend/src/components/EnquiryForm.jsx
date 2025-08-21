import { useState } from "react";


export default function EnquiryForm({ pkg, onSubmit, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = () => {
  //   if (form.name && form.email) {
  //     // onSubmit({ ...form, package_id: pkg.id });
  //     console.log("form data is : ",form)
  //     setForm((prev)=> ({ 
  //       ...prev, 
  //       concern: pkg._id ,
  //       treatment: pkg._id ,
  //       package: pkg._id ,
  //     }));
  //     console.log("PKG is : ",pkg)
  //   }
  //   else{
  //     alert("Please fill all the fields");
  //     return;
  //   }
  // };

  // const handleSubmit = () => {
  //   if (form.name && form.email) {
  //     const packageId = pkg._id;
  //     const treatmentId = pkg.treatments?.[0]?._id; 
  //     const concernId = pkg.treatments?.[0]?.concerns?.[0]?._id;
  //     setForm((prev) => ({
  //       ...prev,
  //       package: packageId,
  //       treatment: treatmentId,
  //       concern: concernId,
  //     }));

  //     console.log("Form inside form is : ", form);

  //     onSubmit(form);
  //     // setForm({ name: "", email: "", message: "" }); // Reset form after submission

  //   } else {
  //     alert("Please fill all the fields");
  //     return;
  //   }
  // };

  const handleSubmit = () => {
    if (form.name && form.email) {
      const packageId = pkg._id;
      const treatmentId = pkg.treatments?.[0]?._id; 
      const concernId = pkg.treatments?.[0]?.concerns?.[0]?._id;

      const updatedForm = {
        ...form,
        package: packageId,
        treatment: treatmentId,
        concern: concernId,
      };

      setForm(updatedForm);

      onSubmit(updatedForm); // ✅ always latest data
      setForm({ name: "", email: "", message: "" }); // Reset form after submission
    } else {
      alert("Please fill all the fields");
    }
  };



  if (!pkg) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Enquire for {pkg.package_name}</h2>
        
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 border rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 border rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full mb-3 border rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
