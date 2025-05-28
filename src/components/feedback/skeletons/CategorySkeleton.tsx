import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col key={idx} sx={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={2}
          width={298}
          height={320}
          viewBox="0 0 298 320"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="298" height="260" />
          <rect x="0" y="280" rx="5" ry="5" width="298" height="20" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeletons}</Row>;
};

export default CategorySkeleton;
