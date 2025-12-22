export default function PlatformHome() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🏠</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome to GrowthPad</h1>
            <p className="text-slate-500 max-w-md">Select a module from the sidebar to verify your strategic alignment.</p>
        </div>
    )
}
