"use client"

import axiosInstance from '@/utils/service';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
    const [namaAgen, setNamaAgen] = useState('');
    const [namaAtasan, setNamaAtasan] = useState('');
    const [mulaiBerlaku, setMulaiBerlaku] = useState('');
    const [akhirBerlaku, setAkhirBerlaku] = useState('');
    const [status, setStatus] = useState(false);
    const [agenList, setAgenList] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch list of agen
        const fetchAgenList = async () => {
            try {
                const response = await axiosInstance('/agen/list');
                setAgenList(response.data.data);
            } catch (error) {
                console.error('Error fetching agen list:', error);
            }
        };
        fetchAgenList();
    }, []);

    useEffect(() => {
        const selectedAgen = agenList.find(agen => agen.id === parseInt(namaAgen));
        if (selectedAgen) {
            const validSupervisors = selectedAgen.supervisors.filter(supervisor => supervisor.supervisor_id !== null);
            setSupervisors(validSupervisors);
        } else {
            setSupervisors([]);
        }
    }, [namaAgen, agenList]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            id_agen: parseInt(namaAgen),
            parent_id: namaAtasan ? parseInt(namaAtasan) : null,
            berlaku_mulai: mulaiBerlaku,
            berlaku_akhir: akhirBerlaku,
            status: status,
        };

        try {
            setLoading(true);
            const response = await axiosInstance.post('/agen/struktur', formData);
            toast.success('Berhasil menambah data');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error('Gagal menambah data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <h1 className="text-2xl font-bold text-center mb-6">Create Agen</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama Agen */}
                    <div>
                        <label htmlFor="nama_agen" className="block text-gray-700 font-medium">
                            Nama Agen
                        </label>
                        <select
                            id="nama_agen"
                            value={namaAgen}
                            onChange={(e) => setNamaAgen(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Pilih Nama Agen</option>
                            {agenList.map((agen) => (
                                <option key={agen.id} value={agen.id}>
                                    {agen.nama_agen}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nama Atasan */}
                    <div>
                        <label htmlFor="nama_atasan" className="block text-gray-700 font-medium">
                            Nama Atasan
                        </label>
                        <select
                            id="nama_atasan"
                            value={namaAtasan}
                            onChange={(e) => setNamaAtasan(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            disabled={supervisors.length === 0}
                        >
                            <option value="">Pilih Nama Atasan</option>
                            {supervisors.length > 0 ? (
                                supervisors.map((supervisor) => (
                                    <option key={supervisor.supervisor_id} value={supervisor.supervisor_id}>
                                        {supervisor.supervisor_name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Supervisors Available</option>
                            )}
                        </select>
                    </div>

                    {/* Mulai Berlaku */}
                    <div>
                        <label htmlFor="mulai_berlaku" className="block text-gray-700 font-medium">
                            Mulai Berlaku
                        </label>
                        <input
                            type="date"
                            id="mulai_berlaku"
                            value={mulaiBerlaku}
                            onChange={(e) => setMulaiBerlaku(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Akhir Berlaku */}
                    <div>
                        <label htmlFor="akhir_berlaku" className="block text-gray-700 font-medium">
                            Akhir Berlaku
                        </label>
                        <input
                            type="date"
                            id="akhir_berlaku"
                            value={akhirBerlaku}
                            onChange={(e) => setAkhirBerlaku(e.target.value)}
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
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}
