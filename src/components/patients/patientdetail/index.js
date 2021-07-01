import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
const PatientDetail = ({ location }) => {
  const patient = location.state.detail;
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Patient Medical Record</CardTitle>
            </CardHeader>
            <hr />

            <CardBody>
              <Row>
                <Col md="4">
                    <h3>Personal Information</h3>
                <hr />
                  <h3>Name</h3>
                  <p>{patient.name + " " + patient.fathername}</p>

                  <h3>Phone Number</h3>
                  <p>{patient.phone}</p>
                  <br />
                  <h3>Weight</h3>
                  <p>{patient.weight + "Kg"}</p>
                  <h3>Dx</h3>
                  <p>{patient.dx}</p>
                </Col>
                <Col md="4">
                  <h2>HX</h2>
                  <hr />

                  <h3>CC</h3>
                  <p>{patient.hx[0].cc}</p>

                  <h3>HPI</h3>
                  <p>{patient.hx[0].hpi}</p>
                </Col>
                <Col md="4">
                  <h2>PX</h2>
                  <hr />
                  <Row>
                  <Col md="6">
                    <h3>GA</h3>
                    <p>{patient.px[0].ga}</p>

                    <h3>PR</h3>
                    <p>{patient.px[0].pr}</p>

                    <h3>RR</h3>
                    <p>{patient.px[0].rr}</p>

                    <h3>BP</h3>
                    <p>{patient.px[0].bp}</p>

                    <h3>Temp</h3>
                    <p>{patient.px[0].temp}</p>

                    <h3>heent</h3>
                    <p>{patient.px[0].heent}</p>
                  </Col>
                  <Col md="6">
                    <h3>lgs</h3>
                    <p>{patient.px[0].lgs}</p>

                    <h3>rs</h3>
                    <p>{patient.px[0].rs}</p>

                    <h3>cvs</h3>
                    <p>{patient.px[0].cvs}</p>

                    <h3>abd</h3>
                    <p>{patient.px[0].abd}</p>
                  </Col>
                  </Row>
                </Col>
                
              </Row>
              <h1>Investigation</h1>
              <hr/>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

PatientDetail.propTypes = {};

export default PatientDetail;
