import { useState } from "react";

const Brand = ({ image, name }: { image: string; name?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
    my-1 relative overflow-hidden w-full h-48 rounded-xl cursor-pointer group
    transition-all duration-300 ease-in-out
    ${isHovered
          ? 'shadow-xl shadow-purple-700/40 transform -translate-y-1'
          : 'shadow-lg shadow-purple-500/20'
        }
  `}
      style={{ backgroundColor: "#312e81" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div
        className={`
      absolute inset-0 z-10 transition-all duration-500 ease-in-out
      ${isHovered
            ? 'bg-gradient-to-br from-indigo-700/80 to-purple-700/90'
            : 'bg-gradient-to-br from-indigo-900/90 to-purple-900/90'
          }
    `}
      />

      {/* Brand image */}
      <img
        className={`
      w-full h-full object-cover transition-transform duration-500 ease-in-out
      ${isHovered ? 'scale-105 saturate-125' : 'scale-100'}
    `}
        src={image}
        alt={name}
      />

      {/* Brand name overlay */}
      {name && (
        <div
          className="absolute bottom-0 left-0 w-full p-5 z-20"
          style={{
            background: "linear-gradient(to top, rgba(49, 46, 129, 0.9) 0%, transparent 100%)"
          }}
        >
          <h3
            className={`
          m-0 text-2xl font-extrabold text-yellow-300 transition-all duration-300 ease-in-out
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}
        `}
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.6)"
            }}
          >
            {name}
          </h3>
        </div>
      )}

      {/* Hover accent shine effect (more subtle) */}
      {isHovered && (
        <div
          className="absolute -top-full -left-full w-[200%] h-[200%] z-10 rotate-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          style={{
            background: `linear-gradient(
          to bottom right,
          transparent 45%,
          rgba(252, 211, 77, 0.3) 50%,
          transparent 55%
        )`
          }}
        />
      )}
    </div>
  );
};

export default Brand;