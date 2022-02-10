import React, { useEffect, useState } from "react";
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
import { resetPassword } from "../../../store/actions/user";
import { getRoles } from "../../../store/actions/roles";
import { AvForm, AvField } from "availity-reactstrap-validation";

import swal from "sweetalert";

const ResetPassword = ({ resetPassword, location, roles }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const { state } = location;

  
  useEffect(() => {
    setFormData({
      id: state.id,
    });
  }, [state]);


  const title = "Reset Password";

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await resetPassword(formData);

    if (data != null) {
      swal("Saved!", "User's password successfully reset!", "success");
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">{title}</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={handleSubmit}>
                <Row>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Password</label>
                      <AvField
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        required={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Confirm Password</label>
                      <AvField
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        required={true}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Password must be the same",
                          },

                          match: { value: "password" },
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Button className="btn-round" color="primary" type="submit">
                    Save Changes
                  </Button>
                </Row>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ResetPassword.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  roles: state.roles.roles,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  resetPassword,
  getRoles,
})(ResetPassword);
