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

const ConsultForm = ({ addConsult, updateConsult, location }) => {
  const [formData, setFormData] = useState({
    topic: "",
    image: null,
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

  const [url, setUrl] = useState(true);

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
        ? await updateConsult(formData, url)
        : await addConsult(formData);
    if (data != null) {
      swal(
        "Saved!",
        "Your Coonsults data has been succesfully saved!",
        "success"
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setFormData({ ...formData, image: image });
      setUrl(false);
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
                    <label>Image</label>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Col>
                  {formData.image !== "" && formData.image != null ? (
                    <img
                      width="300"
                      alt="consult img"
                      src={
                        state != null && url
                          ? formData.image
                          : URL.createObjectURL(formData.image)
                      }
                    />
                  ) : null}
                </Row>
                <Row>
                  <Col className="px-1" md="3">
                    <Button className="btn-round" color="primary" type="submit">
                      Save{" "}
                    </Button>
                  </Col>
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

export default connect(null, { updateConsult, addConsult })(ConsultForm);
