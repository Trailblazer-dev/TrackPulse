const Customers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="mt-2 text-gray-600">Browse all customers and their purchase history</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Customers Page
          </h3>
          <p className="text-gray-600">
            This page will display customer information, purchase history, and analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customers;
