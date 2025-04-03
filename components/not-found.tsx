import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-center flex-col max-w-4xl mx-auto pt-16 sm:pt-20 lg:pt-24 mb-6 sm:mb-8">
          <h1 className="text-gray-900 text-balance font-bold text-center text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
            Not found
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto">
            Could not find requested resource 🥲
          </p>

          <Link
            href="/"
            className="underline mt-4 sm:mt-4 md:mt-6 text-indigo-900 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
