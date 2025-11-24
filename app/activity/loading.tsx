export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center font-roboto">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-lg">Loading page...</p>
            </div>
        </div>
  );
}