import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AddLaporanPetugas = ({ isOpen, onClose, onSubmit }) => {
  const [reportContent, setReportContent] = useState("");
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [type, setType] = useState("");
  const [isTypeLocked, setIsTypeLocked] = useState(false); // State to lock type selection
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guid] = useState(() => uuidv4());
  const [companyGuid] = useState(
    "COMPANY-9a01d431-dfe6-48c2-ae5a-6d0177fd2e19-2024"
  );
  const [reporterName] = useState("TNWK");
  const [reporterGuid] = useState(
    "USER-ce78b8f0-9b65-408b-9be5-bf94ec7ce068-2024"
  );

  // Define a mapping for report types
  const reportTypeMapping = {
    Officer: "Gajah Masuk",
    "report-harian": "laporan harian",
    "report-kegiatan": "Laporan Kegiatan",
    "report-kendala": "Kendala lapangan",
  };

  // Array for dropdown options
  const reportTypes = Object.keys(reportTypeMapping).map((key) => ({
    value: key,
    label: reportTypeMapping[key],
  }));
  useEffect(() => {
    if (isOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Gagal mendapatkan lokasi.");
          }
        );
      } else {
        alert("Geolocation tidak didukung oleh browser ini.");
      }
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!latitude || !longitude) {
      alert("Lokasi belum tersedia, silakan coba lagi.");
      setLoading(false);
      return;
    }

    if (!type) {
      alert("Silakan pilih tipe laporan.");
      setLoading(false);
      return;
    }

    // Use the actual report type value for the API
    // const apiType = reportTypeMapping[type] || type;

    const formData = new FormData();
    formData.append("reportContent", reportContent);
    formData.append("file", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("type", type);
    formData.append("companyGuid", companyGuid);
    formData.append("reporterName", reporterName);
    formData.append("reporterGuid", reporterGuid);
    formData.append("guid", guid);

    try {
      await onSubmit(formData); // Send the form data to the parent component's submit handler
      setReportContent("");
      setFile(null);
      setLatitude(null);
      setLongitude(null);
      setType(""); // Reset type
      setIsTypeLocked(false); // Unlock type selection for next report
      onClose();
    } catch (error) {
      console.error("Error saat mengirim laporan:", error);
      setError("Gagal mengirim laporan.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    setType(event.target.value); 
  };

//   const handleTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setType(selectedType);
//     console.log(`Type selected: ${selectedType}`); // Log the selected type
//     if (selectedType) {
//       setIsTypeLocked(true); // Lock the type once selected
//     }
//   };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Tambah Laporan Petugas
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Isi laporan..."
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
            rows="4"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
          <select
            value={type}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
            disabled={isTypeLocked}
          >
            <option value="">Pilih Tipe Laporan</option>
            {reportTypes.map((rt) => (
              <option key={rt.value} value={rt.value}>
                {rt.label}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {loading ? "Menambahkan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLaporanPetugas;
