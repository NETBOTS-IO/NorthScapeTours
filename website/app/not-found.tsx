// This is the custom 404 page

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl text-orange-600 font-bold">404</h1>
          <p className="text-3xl font-bold">Page not found</p>
          <p className="mt-6 text-xl">
            Sorry, we couldn't find the page you're looking for. Please try again.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
