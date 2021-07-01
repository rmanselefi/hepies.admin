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
import { addDrug, updateDrug } from "../../../store/actions/drug";
import swal from "sweetalert";

const DrugForm = ({ addDrug, updateDrug, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    strength: "",
    unit: "",
    description: "",
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        category: state.detail.category,
        strength: state.detail.strength,
        unit: state.detail.unit,
        description: state.detail.description,
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
      state != null ? await updateDrug(formData) : await addDrug(formData);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    if (data != null) {
      swal(
        "Saved!",
        "Your Patient data has been succesfully saved!",
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
              <CardTitle tag="h5">Add Patient</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={hadleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        placeholder="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange("name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Category</label>
                      <Input
                        placeholder="Category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange("category")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Strength</label>
                      <Input
                        placeholder="Strenght"
                        type="text"
                        value={formData.strength}
                        onChange={handleChange("strength")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Unit</label>
                      <Input
                        placeholder="Unit"
                        type="text"
                        value={formData.unit}
                        onChange={handleChange("unit")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        placeholder="Description"
                        type="textarea"
                        value={formData.description}
                        onChange={handleChange("description")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Register Drug
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

DrugForm.propTypes = {};

export default connect(null, {
  addDrug,
  updateDrug,
})(DrugForm);
