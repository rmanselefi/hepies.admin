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
        ? await updatePatient(formData)
        : await addPatient(formData);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
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
                      <label>Father Name</label>
                      <Input
                        placeholder="Father Name"
                        type="text"
                        value={formData.fathername}
                        onChange={handleChange("fathername")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Grand Father Name</label>
                      <Input
                        placeholder="Grand Father Name"
                        type="text"
                        value={formData.grandfathername}
                        onChange={handleChange("grandfathername")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Phone</label>
                      <Input
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
                      <Input
                        placeholder="Age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange("age")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Sex</label>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={formData.sex}
                        onChange={handleChange("sex")}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Weight</label>
                      <Input
                        placeholder="Weight"
                        type="text"
                        value={formData.weight}
                        onChange={handleChange("weight")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Register Patient
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

PatientForm.propTypes = {};

export default connect(null, {
  addPatient,
  updatePatient,
})(PatientForm);
