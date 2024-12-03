"use client"
import axiosInstance from '@/utils/service';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
    const [noLisensi, setNoLisensi] = useState('');
    const [namaAgen, setNamaAgen] = useState('');
    const [levelAgen, setLevelAgen] = useState('');
    const [wilayahKerja, setWilayahKerja] = useState('');
    const [status, setStatus] = useState(false);
    const [levelOptions, setLevelOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLevelOptions = async () => {
            try {
                const response = await axiosInstance('/agen/list-level');
                console.log(response);

                setLevelOptions(response.data.data);
            } catch (error) {
                console.error('Error fetching agen levels:', error);
            }
        };
        fetchLevelOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            no_lisensi: noLisensi,
            nama: namaAgen,
            level_agen_id: levelAgen,
            wilayah_kerja: wilayahKerja.toLocaleUpperCase(),
            status: status,
        };

        try {
            const response = await axiosInstance.post('/agen', formData);
            toast.success('berhasil menambah data');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error('gagal menambah data');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <h1 className="text-2xl font-bold text-center mb-6">Create Agen</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* No Lisensi */}
                    <div>
                        <label htmlFor="no_lisensi" className="block text-gray-700 font-medium">
                            No Lisensi
                        </label>
                        <input
                            type="text"
                            id="no_lisensi"
                            value={noLisensi}
                            onChange={(e) => setNoLisensi(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Nama Agen */}
                    <div>
                        <label htmlFor="nama_agen" className="block text-gray-700 font-medium">
                            Nama Agen
                        </label>
                        <input
                            type="text"
                            id="nama_agen"
                            value={namaAgen}
                            onChange={(e) => setNamaAgen(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Level Agen */}
                    <div>
                        <label htmlFor="level_agen" className="block text-gray-700 font-medium">
                            Level Agen
                        </label>
                        <select
                            id="level_agen"
                            value={levelAgen}
                            onChange={(e) => setLevelAgen(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select Level</option>
                            {levelOptions.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.level}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Wilayah Kerja */}
                    <div>
                        <label htmlFor="wilayah_kerja" className="block text-gray-700 font-medium">
                            Wilayah Kerja
                        </label>
                        <input
                            type="text"
                            id="wilayah_kerja"
                            value={wilayahKerja}
                            onChange={(e) => setWilayahKerja(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="status"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="status" className="text-gray-700">Status</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
