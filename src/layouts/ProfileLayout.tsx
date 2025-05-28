import { Row, Col, ListGroup } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfileLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (location.pathname.endsWith("/orders")) {
      setActiveTab("orders");
    } else if (location.pathname.endsWith("/change-password")) {
      setActiveTab("changePassword");
    } else {
      setActiveTab("account");
    }
  }, [location]);

  const getNavItemStyle = (tabName: string) => {
    const isActive = activeTab === tabName;
    return {
      color: isActive ? '#312e81' : '#4b5563',
      backgroundColor: isActive ? '#f3f4f6' : 'transparent',
      fontWeight: isActive ? '600' : '400',
      borderLeft: isActive ? '4px solid #6366f1' : 'none',
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Row className="g-6">
          <Col lg={3}>
            <div 
              className="bg-white rounded-xl shadow-sm p-4 sticky top-24 mb-4 sm:mb-0"
              style={{
                border: '1px solid #e5e7eb',
              }}
            >
              <h3 className="mb-4 font-bold text-lg text-gray-800">
                Manage Account
              </h3>
              <ListGroup variant="flush" className="border-0">
                <ListGroup.Item 
                  as={NavLink} 
                  to="" 
                  end
                  className="border-0 py-3 px-4 transition-colors rounded-lg mb-1 hover:bg-gray-50 flex items-center"
                  style={getNavItemStyle("account")}
                  onClick={() => setActiveTab("account")}
                >
                  <i className="bi bi-person-circle me-3 text-lg"></i>
                  Account Info
                </ListGroup.Item>
                <ListGroup.Item 
                  as={NavLink} 
                  to="orders"
                  className="border-0 py-3 px-4 transition-colors rounded-lg mb-1 hover:bg-gray-50 flex items-center"
                  style={getNavItemStyle("orders")}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="bi bi-bag-check me-3 text-lg"></i>
                  My Orders
                </ListGroup.Item>
                <ListGroup.Item 
                  as={NavLink} 
                  to="change-password"
                  className="border-0 py-3 px-4 transition-colors rounded-lg mb-1 hover:bg-gray-50 flex items-center"
                  style={getNavItemStyle("changePassword")}
                  onClick={() => setActiveTab("changePassword")}
                >
                  <i className="bi bi-lock me-3 text-lg"></i>
                  Change Password
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col lg={9}>
            <div 
              className="bg-white rounded-xl shadow-sm p-6"
              style={{
                border: '1px solid #e5e7eb',
                minHeight: '500px'
              }}
            >
              <Outlet />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileLayout;