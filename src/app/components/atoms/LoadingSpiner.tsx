export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <label className="text-2xl font-bold">Loading...</label>
            <div className="relative">
                {/* 外側のリング */}
                <div className="animate-spin h-16 w-16 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                {/* 内側の点 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 bg-blue-500 rounded-full animate-ping"></div>
                </div>
            </div>
        </div>
    );
};
