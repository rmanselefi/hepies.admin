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
import { useFormik } from "formik";

import { addLookup, updateLookup } from "../../../store/actions/lookup";
import swal from "sweetalert";

const LookupForm = ({ addLookup, updateLookup, location }) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
  });
  const validate = (values) => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Required";
    }
    if (!formData.value) {
      errors.value = "Required";
    }

    return errors;
  };

  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        value: state.detail.value,
      });
    }
  }, [state]);

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
    },
    validate,
    onSubmit: async (e,f) => {
      const data =
        state != null ? await updateLookup(formData) : addLookup(formData);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      if (data != null) {
        swal("Saved!", "Your Lookup data has been saved!", "success");
      }
    },
  });

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
      state != null ? await updateLookup(formData) : addLookup(formData);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    if (data != null) {
      swal("Saved!", "Your Lookup data has been saved!", "success");
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Add Lookup</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={(e)=>formik.handleSubmit(e)}>
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
                    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Value</label>
                      <Input
                        placeholder="Value"
                        type="text"
                        value={formData.value}
                        onChange={handleChange("value")}
                      />
                    </FormGroup>
                    {formik.errors.value ? <div>{formik.errors.value}</div> : null}
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Register Lookup
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

LookupForm.propTypes = {};

export default connect(null, {
  addLookup,
  updateLookup,
})(LookupForm);
