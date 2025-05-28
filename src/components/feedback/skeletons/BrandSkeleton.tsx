import ContentLoader from "react-content-loader";

const BrandSkeleton = () => {
  const renderList = Array(8)
    .fill(0)
    .map((_, idx) => (
      <div
        key={idx}
        className="my-1 w-full"
        style={{ height: "180px" }}
      >
        <ContentLoader
          speed={1.5}
          width="100%"
          height={180}
          viewBox="0 0 400 180"
          backgroundColor="#e5e7eb"
          foregroundColor="#f3f4f6"
          style={{
            borderRadius: "12px",
            width: "100%",
            height: "100%"
          }}
        >
          {/* منطقة الصورة */}
          <rect x="0" y="0" rx="12" ry="12" width="400" height="140" />
          
          {/* اسم البراند */}
          <rect x="16" y="152" rx="4" ry="4" width="160" height="16" />
        </ContentLoader>
      </div>
    ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderList}
    </div>
  );
};

export default BrandSkeleton;