import React, { useEffect } from "react";
import { getPrescriptions } from "../../../store/actions/prescriptions";
import { connect } from "react-redux";
import Edit from "@material-ui/icons/RemoveRedEyeOutlined";
import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import MaterialTable from "material-table";
import icons from "../../shared/icons";

const InstrumentPrescriptions = ({
  getPrescriptions,
  users: { datas },
  history,
}) => {
  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  const onClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/prescription/view",
      state: { detail: row },
    });
  };
  let instrumentPrescriptions = datas.filter(
    (data) => data.type === "instrument"
  );

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
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
                  headerStyle: {
                    fontSize: "13px",
                  },
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  {
                    title: "Prescribed By",
                    render: (patient) => {
                      return `${patient.professional}`;
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient.professional}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Patient",
                    render: (patient) => {
                      return `${patient.patient?.name} ${patient.patient?.fathername}`;
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient.patient?.name} ${patient.patient?.fathername}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Phone",
                    render: (patient) => {
                      return `${patient.patient?.phone}`;
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient.patient?.phone}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Material",
                    field: "material_name",
                  },
                  { title: "Size", field: "size" },
                  { title: "Code", field: "code" },
                ]}
                data={instrumentPrescriptions}
                title="Instrument Prescriptions"
                actions={[
                  {
                    icon: () => <Edit />,
                    tooltip: "View Prescription",
                    onClick: (event, rowData) =>
                      alert("Permission " + rowData.name),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

InstrumentPrescriptions.propTypes = {};
const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPrescriptions,
})(withRouter(InstrumentPrescriptions));
