import React, { useEffect } from "react";
import { getPrescriptionPaper } from "../../../store/actions/prescriptions";
import { connect } from "react-redux";
import Edit from "@material-ui/icons/RemoveRedEyeOutlined";
import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import MaterialTable from "material-table";
import icons from "../../shared/icons";
import moment from "moment";

const PrescriptionPaper = ({
  getPrescriptionPaper,
  papers,
  history,
  location,
}) => {
  const { state } = location;
  const code = state.detail.code;
  useEffect(() => {
    getPrescriptionPaper(code);
  }, [getPrescriptionPaper, code]);

  const onClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/prescription/view",
      state: { detail: row },
    });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <h3>Prescription Info</h3>
              <Row>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Patient Name
                  </span>
                  <br />
                  {state.detail.patient.name +
                    " " +
                    state.detail.patient.fathername}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Phone Number
                  </span>
                  <br />
                  {state.detail.patient.phone}
                </Col>

                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Prescribed By
                  </span>
                  <br />
                  {state.detail.patient.professional}
                </Col>

                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Age
                  </span>
                  <br />
                  {state.detail.patient.age}
                </Col>
                <Col>
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    Sent Date
                  </span>
                  <br />
                  {moment(state.detail.patient.createdAt).format("MM/DD/YYYY")}
                </Col>
              </Row>
              <br />
              <MaterialTable
                icons={icons}
                options={{
                  filtering: true,
                  pageSize: 50,
                  padding: "dense",
                  pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
                  paging: true,
                  actionsColumnIndex: -1,
                  maxBodyHeight: "350px",
                  cellStyle: {
                    fontSize: "13px",
                  },
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Drug Name", field: "drug_name" },
                  { title: "Strength", field: "strength" },
                  {
                    title: "Unit",
                    field: "unit",
                  },
                  {
                    title: "Route",
                    field: "route",
                  },
                  {
                    title: "Ampule",
                    field: "ampule",
                  },
                  {
                    title: "Take In",
                    field: "takein",
                  },

                  {
                    title: "Frequency",
                    field: "frequency",
                  },
                  {
                    title: "Material Name",
                    field: "material_name",
                  },
                  {
                    title: "Size",
                    field: "size",
                  },
                ]}
                data={papers}
                title="Prescription Paper"
                // actions={[
                //   {
                //     icon: () => <Edit />,
                //     tooltip: "View Prescription Paper",
                //     onClick: (event, rowData) =>
                //       alert("Permission " + rowData.name),
                //   },
                // ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

PrescriptionPaper.propTypes = {};
const mapStateToProps = (state) => ({
  papers: state.prescriptions.paper,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPrescriptionPaper,
})(withRouter(PrescriptionPaper));
