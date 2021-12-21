import React, { useEffect } from "react";
import { getPharmacies, deleteDrug } from "../../../store/actions/pharmacy";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import "./style.css";

const PharmacistProfile = ({
  history,
  getPharmacies,
  deleteDrug,
  location,
  pharmacies,
}) => {
  useEffect(() => {
    getPharmacies();
  }, [getPharmacies]);

  const { state } = location;

  const detail = state?.detail;

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-style">
            <CardBody>
              <h3>Pharmacist Profile</h3>
              <Row>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Name
                  </span>
                  <br />
                  {detail.name + " " + detail.fathername}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Phone Number
                  </span>
                  <br />
                  {detail.phone}
                </Col>

                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Points
                  </span>
                  <br />
                  {detail.points}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Date of Birth
                  </span>
                  <br />
                  {detail.dob}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Email
                  </span>
                  <br />
                  {detail.email}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Interests
                  </span>
                  <br />
                  {detail.interests}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Sex
                  </span>
                  <br />
                  {detail.sex}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Specialty
                  </span>
                  <br />
                  {detail.speciality}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Workplace
                  </span>
                  <br />
                  {detail.workplace}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

PharmacistProfile.propTypes = {};

const mapStateToProps = (state) => ({
  pharmacies: state.pharmacy.pharmacies,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPharmacies,
  deleteDrug,
})(withRouter(PharmacistProfile));
