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
import { addVoucher, updateVoucher } from "../../../store/actions/voucher";
import swal from "sweetalert";
import { AvForm, AvField } from "availity-reactstrap-validation";
import CircularProgress from "@material-ui/core/CircularProgress";


const VoucherForm = ({ addVoucher, updateVoucher, location, loading }) => {
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    amount: "",
  });
  const { state } = location;

  useEffect(() => {
    if (state != null) {
      setFormData({
        id: state.detail.id,
        code: state.detail.code,
        amount: state.detail.amount,
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
      state != null ? await updateVoucher(formData) : addVoucher(formData);
    if (data != null) {
      swal("Saved!", "Your Voucher data has been saved!", "success");
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Add Voucher</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="5">
                    <FormGroup>
                      <label>Code</label>
                      <AvField
                        placeholder="Code"
                        name="code"
                        type="text"
                        value={formData.code}
                        onChange={handleChange("code")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>When</label>
                      <AvField
                        placeholder="Amount"
                        name="amount"
                        type="text"
                        value={formData.amount}
                        onChange={handleChange("amount")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-1" md="4">
                    <Button className="btn-round" color="primary" type="submit">
                      Save Voucher
                    </Button>
                    {loading && <CircularProgress />}
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

VoucherForm.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.vouchers.loading,
});

export default connect(mapStateToProps, {
  addVoucher,
  updateVoucher,
})(VoucherForm);
