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
import { AvForm, AvField } from 'availity-reactstrap-validation'

const DrugForm = ({ addDrug, updateDrug, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    strength: "",
    unit: "",
    about: "",
    route: ""
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
        description: state.detail.about,
        route:state.detail.route
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
              <AvForm onValidSubmit={hadleSubmit}>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Name</label>
                      <AvField
                        placeholder="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange("name")}
                        name="name"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Category</label>
                      <AvField
                        placeholder="Category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange("category")}
                        name="category"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Strength</label>
                      <AvField
                        placeholder="Strength"
                        type="text"
                        value={formData.strength}
                        onChange={handleChange("strength")}
                        name="strength"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Unit</label>
                      <AvField
                        placeholder="Unit"
                        type="text"
                        value={formData.unit}
                        onChange={handleChange("unit")}
                        name="unit"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-1" md="6">
                  <FormGroup>
                      <label>Route</label>
                      <AvField
                        placeholder="Route"
                        type="text"
                        value={formData.route}
                        onChange={handleChange("route")}
                        name="route"                        
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Description</label>
                      <AvField
                        placeholder="Description"
                        type="textarea"
                        value={formData.description}
                        onChange={handleChange("description")}
                        name="description"
                        
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
              </AvForm>
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
