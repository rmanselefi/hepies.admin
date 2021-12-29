import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { addDrug, updateDrug } from "../../../store/actions/drug";
import swal from "sweetalert";
import { AvForm, AvField } from "availity-reactstrap-validation";

const InstrumentForm = ({ addDrug, updateDrug, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    material_name: "",
    size: "",
    how_many: "",
    type:"instrument"
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        material_name: state.detail.material_name,
        size: state.detail.size,
        how_many: state.detail.how_many,
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
        "Your Instrument data has been Successfully saved!",
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
              <CardTitle tag="h5">Change Instruments Data</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={hadleSubmit}>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Material Name</label>
                      <AvField
                        placeholder="Material Name"
                        type="text"
                        value={formData.material_name}
                        onChange={handleChange("material_name")}
                        name="material_name"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Size</label>
                      <AvField
                        placeholder="Size"
                        type="text"
                        value={formData.size}
                        onChange={handleChange("size")}
                        name="size"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>How Many</label>
                      <AvField
                        placeholder="How Many"
                        type="text"
                        value={formData.how_many}
                        onChange={handleChange("how_many")}
                        name="how_many"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button className="btn-round" color="primary" type="submit">
                      Save Drug
                    </Button>
                  </Col>
                </Row>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

InstrumentForm.propTypes = {};

export default connect(null, {
  addDrug,
  updateDrug,
})(InstrumentForm);
