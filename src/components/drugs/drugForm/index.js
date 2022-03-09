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
import { AvForm, AvField } from "availity-reactstrap-validation";
import CircularProgress from "@material-ui/core/CircularProgress";

const DrugForm = ({ addDrug, updateDrug, location, loading }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    strength: "",
    unit: "",
    about: "",
    route: "",
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        type: state.detail.type,
        strength: state.detail.strength,
        unit: state.detail.unit,
        about: state.detail.about,
        route: state.detail.route,
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
      state != null ? await updateDrug(formData) : await addDrug(formData);

    if (data != null) {
      swal("Saved!", "Your Drug data has been successfully saved!", "success");
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Change Drug Data</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={handleSubmit}>
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
                        value={formData.type}
                        onChange={handleChange("type")}
                        name="type"
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
                        value={formData.about}
                        onChange={handleChange("about")}
                        name="about"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button className="btn-round" color="primary" type="submit">
                      Save Drug
                    </Button>
                    {loading && <CircularProgress />}
                  </Col>
                  <Col></Col>
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

const mapStateToProps = (state) => ({
  loading: state.drugs.loading,
});
export default connect(mapStateToProps, {
  addDrug,
  updateDrug,
})(DrugForm);
