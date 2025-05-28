import ContentLoader from "react-content-loader";

import { Row, Col } from "react-bootstrap";

const ProductSkeleton = () => {
  const renderList = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col
        key={idx}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <ContentLoader
          speed={2}
          width={300}
          height={400}
          viewBox="0 0 300 400"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* صورة المنتج */}
          <rect x="25" y="40" rx="10" ry="10" width="250" height="220" />

          {/* اسم المنتج */}
          <rect x="50" y="270" rx="5" ry="5" width="200" height="15" />

          {/* سعر المنتج */}
          <rect x="75" y="295" rx="5" ry="5" width="150" height="15" />

          {/* عدد العناصر التي يمكن إضافتها */}
          <rect x="50" y="320" rx="5" ry="5" width="200" height="12" />

          {/* زر "Add to Cart" */}
          <rect x="75" y="345" rx="20" ry="20" width="150" height="40" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderList}</Row>;
};

export default ProductSkeleton;
