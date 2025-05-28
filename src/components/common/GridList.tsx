import { Row, Col } from "react-bootstrap";
import React from "react";
import LottieHandler from "@components/feedback/LottieHandler";

interface GridListProps<T> {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
}

type HasId = { _id?: string | number };

const GridList = <T extends HasId>({
  records,
  renderItem,
  emptyMessage
}: GridListProps<T>) => {
  const productList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          key={record._id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="mb-8 "
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <Col xs={12} className="text-center py-12">
        <LottieHandler type="empty" message={emptyMessage} />
      </Col>
    );
    
  return <Row className="justify-content-center">{productList}</Row>;
};

export default GridList;