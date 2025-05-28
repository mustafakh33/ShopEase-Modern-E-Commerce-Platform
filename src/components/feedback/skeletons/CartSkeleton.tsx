import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CartSkeleton = () => {
  return (
    <Row>
      <Col>
      <ContentLoader
        speed={2}
        width={1296}
        height={229}
        viewBox="0 0 1296 229"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
         {/* Cart Title */}
        <rect x="0" y="0" rx="5" ry="5" width="1296" height="30" /> 

        {/* Cart Item 1 */}
        <rect x="0" y="50" rx="5" ry="5" width="150" height="150" /> 
        <rect x="170" y="50" rx="5" ry="5" width="300" height="20" /> 
        <rect x="170" y="80" rx="5" ry="5" width="200" height="15" /> 
        <rect x="170" y="105" rx="5" ry="5" width="100" height="15" /> 
        <rect x="170" y="130" rx="5" ry="5" width="80" height="30" /> 
        <rect x="260" y="130" rx="5" ry="5" width="80" height="30" /> 
        <rect x="1000" y="50" rx="5" ry="5" width="80" height="30" /> 
        <rect x="1000" y="90" rx="5" ry="5" width="150" height="30" /> 
      </ContentLoader>
      </Col>
    </Row>
  );
};

export default CartSkeleton;