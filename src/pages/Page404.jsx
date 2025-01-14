import {useNavigate} from "react-router-dom";
import {Page404Illustration} from "../assets/notFound";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="max-w-screen-md mx-auto min-h-screen flex justify-center flex-col p-8 sm:p-16 md:p-24 lg:p-32">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8">
          Sorry, page not found!
        </h1>

        <p className="text-gray-500 mb-6 sm:mb-8">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>

        {/* <div className="w-full sm:w-1/2 h-auto">
          <Page404Illustration />
        </div> */}

        <button
          onClick={() => navigate("/")}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-base sm:text-lg focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 transition duration-300 ease-in-out mt-6"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
