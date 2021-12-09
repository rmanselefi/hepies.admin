import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,  
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { saveGuideline } from "../../../store/actions/guidelinesActions";
import swal from "sweetalert";
import { AvForm } from "availity-reactstrap-validation";

const DrugForm = ({ saveGuideline, updateDrug, location }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    url: "",
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        name: state.detail.name,
        url: state.detail.url,
      });
    }
  }, [state]);

  const hadleSubmit = async (e) => {
    e.preventDefault();
    const data =
      state != null
        ? await updateDrug(formData)
        : await saveGuideline(formData);
    
    if (data != null) {
      swal(
        "Saved!",
        "Your Patient data has been succesfully saved!",
        "success"
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setFormData({ ...formData, image: image });
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Add Guideline</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={hadleSubmit}>
                <Row></Row>
                <Row>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Upload Guideline
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
  saveGuideline,
})(DrugForm);
