import { useState, useEffect } from "react";

interface AntrianData {
  _id: string;
  platNomor: string;
  namaPelanggan: string;
  status: string;
  harga: string;
  deskripsi: string;  // Field baru untuk deskripsi
  createdAt: string;
  nomorTelepon: string;
}

const statusColors: Record<string, string> = {
  Progress: "#6BDDDD",
  Done: "#3762CC",
  Queue: "#F9A7A7",
};

const TableThree = () => {
  const [antrianData, setAntrianData] = useState<AntrianData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<string>("Hari Ini");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<AntrianData | null>(null);
  const [formData, setFormData] = useState<Partial<AntrianData>>({});
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/antrian");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        const data: AntrianData[] = result.data || [];

        const filteredData = data.filter((item) => {
          const today = new Date();
          const itemDate = new Date(item.createdAt);
          const diffTime = Math.floor(
            (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (selectedDay === "Hari Ini") return diffTime === 0;
          if (selectedDay === "Kemarin") return diffTime === 1;
          if (selectedDay === "3 Hari Lalu") return diffTime <= 3;
          return true;
        });

        setAntrianData(filteredData);
      } catch (error) {
        console.error("Error fetching antrian data:", error);
        alert("Gagal mengambil data. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDay]);

  const totalPages = Math.ceil(antrianData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = antrianData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDetailsClick = (item: AntrianData) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        await fetch(`/api/antrian?_id=${selectedItem._id}`, {
          method: "DELETE",
        });
        setAntrianData((prev) =>
          prev.filter((data) => data._id !== selectedItem._id)
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to delete data:", error);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSave = async () => {
  if (selectedItem) {
    try {
      const response = await fetch(`/api/antrian?_id=${selectedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        // Mengupdate state dengan data yang baru
        setAntrianData((prev) =>
          prev.map((item) =>
            item._id === selectedItem._id ? { ...item, ...formData } : item
          )
        );
        setIsModalOpen(false);
        alert("Data berhasil diperbarui");
      } else {
        console.error("Failed to update data");
        alert("Gagal memperbarui data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
};

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-6 pb-6 pt-5 shadow-md dark:bg-gray-800 dark:shadow-lg xl:col-span-5">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-body-2xlg font-semibold text-black">Car Status</h4>
          <select
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded"
          >
            <option value="Hari Ini">Hari Ini</option>
            <option value="Kemarin">Kemarin</option>
            <option value="3 Hari Lalu">3 Hari Terakhir</option>
            <option value="Semua Hari">Semua Hari</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left dark:bg-dark-2">
                  <th className="text-center px-4 py-4 font-medium text-dark dark:text-white">
                    No
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    Plate Number
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    Driver
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    Earning
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border-b px-4 py-6 text-center dark:border-dark-3">
                      {startIndex + index + 1}
                    </td>
                    <td className="border-b px-4 py-4 text-start dark:border-dark-3">
                      {item.platNomor}
                    </td>
                    <td className="border-b px-4 py-4 dark:border-dark-3">
                      {item.namaPelanggan}
                    </td>
                    <td className="border-b px-5 py-4 dark:border-dark-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className="inline-block h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: statusColors[item.status] || "#ccc",
                          }}
                        ></span>
                        <span>{item.status}</span>
                      </div>
                    </td>
                    <td className="border-b px-4 py-4 dark:border-dark-3">
                      {item.harga}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDetailsClick(item)}
                        className="text-white bg-[#3676e0] w-20 rounded-lg px-2 py-2 text-center"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center gap-4 items-center mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 px-4 py-1 rounded-full rounded text-gray-600 disabled:opacity-50"
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-200 px-5 py-1 rounded text-gray-600 disabled:opacity-50 rounded-full"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">{isEditMode ? "Edit" : "Details"}</h2>
            {isEditMode ? (
              <div>
                <div className="mb-4">
                  <label className="block">Status</label>
                  <select
                    name="status"
                    value={formData.status || ""}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="Queue">Queue</option>
                    <option value="Progress">Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block">Description</label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi || ""}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Plate Number:</strong> {formData.platNomor}</p>
                <p><strong>Driver:</strong> {formData.namaPelanggan}</p>
                <p><strong>Earning:</strong> {formData.harga}</p>
                <p><strong>Status:</strong> {formData.status}</p>
                <p><strong>Description:</strong> {formData.deskripsi}</p> {/* Read-only description */}
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              {isEditMode ? (
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableThree;
