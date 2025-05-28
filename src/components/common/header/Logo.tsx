import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0 text-2xl font-extrabold tracking-tight">
      <Link
        to="/"
        className="no-underline text-indigo-900 hover:text-indigo-700 flex items-center"
      >
        <span>Shop</span>
        <span className="text-purple-800">Ease</span>
        <span className="text-xs ml-1 px-2 py-0.5 rounded-full font-bold bg-purple-700 text-white shadow-sm">PRO</span>
      </Link>
    </div>
  );
};

export default Logo; 