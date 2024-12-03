import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Live Coding - BRI LIFE</h1>

        <div className="space-y-4">
          <Link href="/create-agen" className="block py-2 px-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition duration-300">
            Create Agen
          </Link>
          <Link href="/create-struktur-agen" className="block py-2 px-4 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition duration-300">
            Create Data Struktur Agen
          </Link>
          <Link href="/laporan" className="block py-2 px-4 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition duration-300">
            Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
