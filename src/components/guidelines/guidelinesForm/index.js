import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  CustomInput,
  Progress,
} from "reactstrap";
import { connect } from "react-redux";
import { saveGuideline } from "../../../store/actions/guidelinesActions";
import swal from "sweetalert";
import { AvForm } from "availity-reactstrap-validation";
import { UPLOAD_STATUS } from "store/actions/types";

const GuidelinesForm = ({ saveGuideline, loading, percentage }) => {
  const [formData, setFormData] = useState({
    id: "",
    image: null,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(percentage);

    if (percentage === 100) {
      swal("Saved!", "Your Guideline is uploaded successfully", "success");
    }
  }, [percentage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      saveGuideline(formData).then(() => {});
    } catch (e) {
      swal("Error!", "Unable to upload your Guideline!", "error");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setFormData({ image });
    }
  };
  console.log("====================================");
  console.log(percent);
  console.log("====================================");
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Upload Guideline</CardTitle>
            </CardHeader>
            <CardBody>
              {percent > 0 ? (
                <>
                  {percent + "%"}
                  <Progress striped color="info" value={percent} />
                </>
              ) : null}

              <AvForm onValidSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <CustomInput
                      accept="application/pdf"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Button className="btn-round" color="primary" type="submit">
                      Upload Guideline
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

GuidelinesForm.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.guidelines.loading,
  percentage: state.guidelines.percentage,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  saveGuideline,
})(GuidelinesForm);
