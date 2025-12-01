export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] rounded-2xl animate-spin" 
               style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-3xl font-black bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
              L
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Loading...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your experience
        </p>

        {/* Progress Bar */}
        <div className="mt-6 w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-[#2A52BE] to-[#F97316] animate-pulse" 
               style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  )
}
