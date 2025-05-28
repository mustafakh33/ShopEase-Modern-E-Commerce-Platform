import { useState } from "react";
import { Link } from "react-router";
import { ICategory } from "../../../types/category";
import { FaArrowRight } from "react-icons/fa";

const Category = ({ _id, name, image }: ICategory) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-purple-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${_id}`} className="block h-full">
        <div className="relative">
          {/* Image container */}
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110 brightness-75' : 'scale-100'}`}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent transition-opacity duration-300" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3
              className="text-white text-2xl font-extrabold mb-4 drop-shadow-md"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              {name}
            </h3>

            {/* View products button */}
            <button
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
            ${isHovered
                  ? 'bg-white text-purple-800 shadow-md hover:shadow-lg'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                }`}
            >
              <span>Show Products</span>
              <FaArrowRight className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Category;

