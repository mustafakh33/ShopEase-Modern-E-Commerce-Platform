const NewsletterSection = () => {
  return (
    <section className="py-16 bg-indigo-50 border-t border-indigo-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2 text-indigo-900">Stay Updated</h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto mb-4"></div>
          <p className="text-lg mb-8 text-indigo-600">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
            <button
              className="px-6 py-3 bg-purple-800 hover:bg-purple-700 rounded-lg font-bold text-white transition duration-300 shadow-md"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 