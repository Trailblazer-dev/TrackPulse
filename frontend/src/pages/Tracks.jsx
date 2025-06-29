const Tracks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tracks</h1>
        <p className="mt-2 text-gray-600">Browse all tracks in the database</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tracks Page
          </h3>
          <p className="text-gray-600">
            This page will display all tracks with detailed information, filtering, and sorting capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
