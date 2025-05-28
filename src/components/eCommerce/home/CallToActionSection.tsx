const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of satisfied customers who trust our products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-purple-800 hover:bg-indigo-100 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-semibold text-white hover:bg-white hover:text-purple-800 transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 