import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import navigationStyle from "../../assets/css/style.module.css";
import brandImg from "../../assets/image/sms-logo-2.png";

const Navigation = () => {
  return (
    <Container fluid className={navigationStyle.mainContainer}>
      <Container>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <span className={navigationStyle.navTextColor}>
                {" "}
                React Twilior{" "}
                <span>
                  <img
                    src={brandImg}
                    alt=""
                    className={navigationStyle.brandImgStyle}
                  />{" "}
                </span>
                Sender Application
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home" className="me-5">
                  <span className={navigationStyle.navTextColor}>
                    SMS Gateway
                  </span>
                </Nav.Link>
                <Nav.Link href="#home" className="me-5">
                  <span className={navigationStyle.navTextColor}>Company</span>
                </Nav.Link>
                <Nav.Link href="#home" className="me-5">
                  <span className={navigationStyle.navTextColor}>
                    Solutions
                  </span>
                </Nav.Link>
                <Nav.Link href="#home" className="me-5">
                  <span className={navigationStyle.navTextColor}>Pricing</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Navigation;
