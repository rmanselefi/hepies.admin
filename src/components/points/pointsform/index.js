import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { addPoint, updatePoint } from "../../../store/actions/points";
import swal from 'sweetalert'

const PointsForm = ({ addPoint, updatePoint, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    point: "",
    when: "",
    to: "",
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        point: state.detail.point,
        when: state.detail.when,
        to: state.detail.to,
      });
    }
  }, [state]);

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data =
      state != null ? await updatePoint(formData) : addPoint(formData);   
    if (data != null) {
      swal("Saved!", "Your Point data has been saved!", "success");
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Add Point</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Point</label>
                      <Input
                        placeholder="Point"
                        type="text"
                        value={formData.point}
                        onChange={handleChange("point")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>When</label>
                      <Input
                        placeholder="When"
                        type="text"
                        value={formData.when}
                        onChange={handleChange("when")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>To</label>
                      <Input
                        placeholder="To"
                        type="text"
                        value={formData.to}
                        onChange={handleChange("to")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Add Point
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

PointsForm.propTypes = {};

export default connect(null, {
  addPoint,
  updatePoint,
})(PointsForm);
