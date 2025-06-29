const Albums = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Albums</h1>
        <p className="mt-2 text-gray-600">Browse all albums in the database</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Albums Page
          </h3>
          <p className="text-gray-600">
            This page will display all albums with pagination and search functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Albums;
