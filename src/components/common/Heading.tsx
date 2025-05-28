import { memo } from "react";

interface HeadingProps {
  title: React.ReactNode;
  className?: string;
}

const Heading = memo(({ title, className = "" }: HeadingProps) => {
  return (
    <h2 className={`font-bold text-gray-900 ${className}`}>
      {title}
    </h2>
  );
});

export default Heading;
