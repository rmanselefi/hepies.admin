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
import { addConsult, updateConsult } from "../../../store/actions/consults";
import swal from "sweetalert";

const ConsultForm = ({ addConsult, location }) => {
  const [formData, setFormData] = useState({
    topic: "",
    image: "",
  });

  const { state } = location;
  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        topic: state.detail.topic,
        image: state.detail.image,
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
  const hadleSubmit = async (e) => {
    e.preventDefault();
    const data =
      state != null
        ? await addConsult(formData)
        : await updateConsult(formData);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    if (data != null) {
      swal(
        "Saved!",
        "Your Coonsults data has been succesfully saved!",
        "success"
      );
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Post Consult</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={hadleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Topic</label>
                      <Input
                        placeholder="Topic"
                        type="text"
                        value={formData.topic}
                        onChange={handleChange("topic")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Image</label>
                      <Input
                        placeholder="Image"
                        type="text"
                        value={formData.image}
                        onChange={handleChange("image")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Save{" "}
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

ConsultForm.propTypes = {};

export default connect(null, {
  addConsult,
})(ConsultForm);
