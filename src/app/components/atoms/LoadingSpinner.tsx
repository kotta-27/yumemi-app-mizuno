

export const LoadingSpinner = ({ width = 16, height = 16, hScreen = true }: { width?: number, height?: number, hScreen?: boolean }) => {
    return (
        <div className={`flex flex-col justify-center items-center ${hScreen ? 'h-screen' : 'h-32'}`}>
            <label className="text-2xl font-bold">Loading...</label>
            <div className="relative">
                {/* 外側のリング */}
                <div className={`animate-spin h-${height} w-${width} border-4 border-gray-300 border-t-blue-500 rounded-full`}></div>
                {/* 内側の点 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 bg-blue-500 rounded-full animate-ping"></div>
                </div>
            </div>
        </div>
    );
};
