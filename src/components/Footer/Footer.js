import React from "react";
import { Container } from "react-bootstrap";
import footerStyle from "../../assets/css/style.module.css";

const Footer = () => {
  return (
    <Container fluid className={footerStyle.footerContainer}>
      <Container>
        <div>
          <p>
            Copyright © 2022 React Twilior SMS Sender Application. All rights
            reserved
          </p>
        </div>
      </Container>
    </Container>
  );
};

export default Footer;
