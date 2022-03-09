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
import { addPatient, updatePatient } from "../../../store/actions/patient";
import { toast } from "react-toastify";
import { AvForm, AvField } from "availity-reactstrap-validation";

const PatientForm = ({ addPatient, updatePatient, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    fathername: "",
    grandfathername: "",
    age: "",
    sex: "",
    weight: "",
    phone: "",
    dx: "",
  });
  const { state } = location;
  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        fathername: state.detail.fathername,
        grandfathername: state.detail.grandfathername,
        age: state.detail.age,
        sex: state.detail.sex,
        weight: state.detail.weight,
        phone: state.detail.phone,
        dx: state.detail.dx,
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
      state != null
        ? await updatePatient(formData)
        : await addPatient(formData);
    if (data != null) {
      toast.success("Patient is succesfully saved", {
        position: "top-center",
      });
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
              <AvForm onValidSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Name</label>
                      <AvField
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange("name")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="4">
                    <FormGroup>
                      <label>Father Name</label>
                      <AvField
                        name="fathername"
                        placeholder="Father Name"
                        type="text"
                        value={formData.fathername}
                        onChange={handleChange("fathername")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Grand Father Name</label>
                      <AvField
                        name="grandfathername"
                        placeholder="Grand Father Name"
                        type="text"
                        value={formData.grandfathername}
                        onChange={handleChange("grandfathername")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Phone</label>
                      <AvField
                        name="phone"
                        placeholder="Phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Age</label>
                      <AvField
                        name="age"
                        placeholder="Age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange("age")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <label>Sex</label>
                      <AvField
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={formData.sex}
                        onChange={handleChange("sex")}
                        required
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </AvField>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Weight</label>
                      <AvField
                        name="weight"
                        placeholder="Weight"
                        type="text"
                        value={formData.weight}
                        onChange={handleChange("weight")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <Button className="btn-round" color="primary" type="submit">
                      Register Patient
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

PatientForm.propTypes = {};

export default connect(null, {
  addPatient,
  updatePatient,
})(PatientForm);
