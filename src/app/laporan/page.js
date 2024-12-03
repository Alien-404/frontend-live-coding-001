"use client";
import axiosInstance from "@/utils/service";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const [wilayah, setWilayah] = useState("");
    const [status, setStatus] = useState("");
    const [wilayahList, setWilayahList] = useState([]);
    const [agenData, setAgenData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWilayahList = async () => {
            try {
                const response = await axiosInstance.get("/agen/list-wilayah");
                setWilayahList(response.data.data);
            } catch (error) {
                console.error("Error fetching wilayah list:", error);
            }
        };
        fetchWilayahList();
    }, []);

    const fetchAgenData = async () => {
        if (!wilayah || !status) return;
        try {
            setLoading(true);
            const response = await axiosInstance.post('/agen/laporan', {
                "wilayah": wilayah.toLocaleUpperCase(),
                "status": status
            });
            setAgenData(response.data.data);
        } catch (error) {
            toast.error('no data found');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <h1 className="text-2xl font-bold text-center mb-6">Laporan Agen</h1>
                <div className="space-y-4">
                    {/* Pilih Wilayah */}
                    <div>
                        <label htmlFor="wilayah" className="block text-gray-700 font-medium">
                            Pilih Wilayah
                        </label>
                        <select
                            id="wilayah"
                            value={wilayah}
                            onChange={(e) => setWilayah(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                        >
                            <option value="">Pilih Wilayah</option>
                            {wilayahList.map((wilayahItem) => (
                                <option key={wilayahItem.wilayah_kerja} value={wilayahItem.wilayah_kerja}>
                                    {wilayahItem.wilayah_kerja}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pilih Status */}
                    <div>
                        <label htmlFor="status" className="block text-gray-700 font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                        >
                            <option value={null}>Pilih Status</option>
                            <option value={true}>Aktif</option>
                            <option value={false}>Non-Aktif</option>
                        </select>
                    </div>

                    {/* Cari Button */}
                    <div>
                        <button
                            onClick={fetchAgenData}
                            disabled={!wilayah || status === ""}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                        >
                            Cari
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2">Level Agen</th>
                                    <th className="border p-2">Nama Agen</th>
                                    <th className="border p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agenData.length > 0 ? (
                                    agenData.map((wilayahItem) =>
                                        (wilayahItem.agen || []).map((levelItem) =>
                                            (levelItem.agen_list || []).map((agenItem) => (
                                                <tr key={agenItem.nama_agen}>
                                                    <td className="border p-2">{levelItem.agen_level}</td>
                                                    <td className="border p-2">{agenItem.nama_agen}</td>
                                                    <td className="border p-2">{agenItem.status ? 'Aktif' : 'Non-Aktif'}</td>
                                                </tr>
                                            ))
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="border p-2 text-center">
                                            Tidak ada data.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
