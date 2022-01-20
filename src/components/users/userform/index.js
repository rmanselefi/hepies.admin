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
import { addUser, updateUser } from "../../../store/actions/user";
import { getRoles } from "../../../store/actions/roles";
import { AvForm, AvField } from "availity-reactstrap-validation";

import swal from "sweetalert";

const UserForm = ({ addUser, getRoles, updateUser, location, roles }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    fathername: "",
    email: "",
    grandfathername: "",
    proffesion: "",
    profile: "",
    phone: "",
    points: "",
    speciality: "",
    workplace: "",
    interests: "",
    user: {
      id: "",
      username: "",
      password: "",
      role: "",
    },
  });

  const { state } = location;
  const title = state != null ? "Update user" : "Register user";
  useEffect(() => {
    getRoles();
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        fathername: state.detail.fathername,
        grandfathername: state.detail.grandfathername,
        proffesion: state.detail.proffesion,
        profile: state.detail.profile,
        email: state.detail.email,
        phone: state.detail.phone,
        points: state.detail.points,
        speciality: state.detail.speciality,
        workplace: state.detail.workplace,
        interests: state.detail.interests,
        user: {
          id: state.detail.user.id,
          username: state.detail.user.username,
          role: state.detail.user.role.id,
        },
      });
    }
  }, [state, getRoles]);

  const handleChange = (name) => (event) => {
    event.preventDefault();
    if (name === "password" || name === "username" || name === "role") {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name]: event.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: event.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data =
      state != null ? await updateUser(formData) : await addUser(formData);
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
              <CardTitle tag="h5">{title}</CardTitle>
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
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Profession</label>
                      <AvField
                        name="proffesion"
                        placeholder="Profession"
                        type="text"
                        value={formData.proffesion}
                        onChange={handleChange("proffesion")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Email</label>
                      <AvField
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Points</label>
                      <Input
                        placeholder="Points"
                        type="text"
                        value={formData.points}
                        onChange={handleChange("points")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Speciality</label>
                      <Input
                        placeholder="Speciality"
                        type="text"
                        value={formData.speciality}
                        onChange={handleChange("speciality")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Workplace</label>
                      <Input
                        placeholder="Workplace"
                        type="text"
                        value={formData.workplace}
                        onChange={handleChange("workplace")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Interests</label>
                      <Input
                        placeholder="Interests"
                        type="text"
                        value={formData.interests}
                        onChange={handleChange("interests")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Username</label>
                      <AvField
                        name="username"
                        placeholder="Username"
                        type="text"
                        value={formData.user?.username}
                        onChange={handleChange("username")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Password</label>
                      <AvField
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.user?.password}
                        onChange={handleChange("password")}
                        required={state !== null ? false : true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Role</label>
                      <AvField
                        required
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={formData.user?.role}
                        onChange={handleChange("role")}
                      >
                        {roles.map((d, i) => {
                          return (
                            <option key={i} value={d.id}>
                              {d.name}
                            </option>
                          );
                        })}
                      </AvField>
                    </FormGroup>
                  </Col>
                </Row>
                <Row></Row>
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

UserForm.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  roles: state.roles.roles,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addUser,
  updateUser,
  getRoles,
})(UserForm);
