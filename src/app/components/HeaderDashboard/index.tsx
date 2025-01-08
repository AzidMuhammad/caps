import { useState } from "react";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { FaSearch } from "react-icons/fa";

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void; }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleTambahAntrian = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/antrian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data berhasil ditambahkan!");
        setModalOpen(false);
      } else {
        const { error } = await response.json();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="block lg:hidden"
            >
              <span className="relative block w-5 h-5">
                <span className="absolute block w-full h-0.5 bg-gray-800 dark:bg-white top-1"></span>
                <span className="absolute block w-full h-0.5 bg-gray-800 dark:bg-white top-2"></span>
                <span className="absolute block w-full h-0.5 bg-gray-800 dark:bg-white top-3"></span>
              </span>
            </button>
          </div>

          <div className="hidden w-full max-w-lg lg:flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search here"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
              <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownNotification />
            <button
              onClick={() => setModalOpen(true)}
              className="lg:inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              + Tambah Data Antrian
            </button>
            <DropdownUser />
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div
          className="fixed z-99 inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Tambah Data Antrian</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = {
                  namaPelanggan: formData.get("namaPelanggan") as string,
                  platNomor: formData.get("platNomor") as string,
                  nomorTelepon: formData.get("nomorTelepon") as string,
                  tipeMobil: formData.get("tipeMobil") as string,
                  harga: parseFloat(formData.get("harga") as string),
                  deskripsi: formData.get("deskripsi") as string || "",
                  status: formData.get("status") as string || "Queue",
                };
                handleTambahAntrian(data);
              }}
            >
              <input name="namaPelanggan" placeholder="Nama Pelanggan" className="mb-2 p-2 border w-full" required />
              <input name="platNomor" placeholder="Plat Nomor" className="mb-2 p-2 border w-full" required />
              <input name="nomorTelepon" placeholder="Nomor Telepon" className="mb-2 p-2 border w-full" required />
              <input name="tipeMobil" placeholder="Tipe Mobil" className="mb-2 p-2 border w-full" required />
              <input name="harga" placeholder="Harga" type="number" className="mb-2 p-2 border w-full" required />              
              <select name="status" className="mb-2 p-2 border w-full">
                <option value="Queue">Queue</option>
                <option value="Progress">Progress</option>
                <option value="Done">Done</option>
              </select>
              <textarea name="deskripsi" placeholder="Deskripsi" className="mb-2 p-2 border w-full" />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
