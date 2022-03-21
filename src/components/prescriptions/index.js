import React, { useEffect } from "react";
import { getPrescriptions, resend } from "../../store/actions/prescriptions";
import { connect } from "react-redux";
import Edit from "@material-ui/icons/RemoveRedEyeOutlined";
import SendIcon from "@material-ui/icons/Send";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import MaterialTable from "material-table";
import icons from "../shared/icons";
import moment from "moment";
import swal from "sweetalert";

const Prescriptions = ({
  getPrescriptions,
  prescriptions,
  history,
  resend,
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
  const onResendClick = async (e, row) => {
    const res = await resend(row.id);
    if (res) {
      swal(
        "Sent!",
        "Prescription is successfully resent to the patient!",
        "success"
      );
    } else {
      swal("Error!", "Unable to resend prescription", "error");
    }
  };

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
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Code", field: "code" },
                  { title: "Type", field: "type" },
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
                    title: "Wt",
                    field: "patient.weight",
                  },
                  {
                    title: "Phone Number",
                    render: (patient) => {
                      return `${patient.patient?.phone}`;
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient.patient?.phone}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Prescribed By",
                    field: "professional",
                  },

                  {
                    title: "Sent Date",
                    render: (patient) => {
                      return moment(patient.createdAt).format("MM/DD/YYYY");
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient.professional}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Dx",
                    field: "diagnosis",
                  },
                  {
                    title: "Remark",
                    field: "remark",
                  },
                  {
                    title: "Status",
                    field: "status",
                  },
                  

                  {
                    title: "Resend",
                    render: (patient) => {
                      return (
                        <div>
                          <SendIcon
                            onClick={(e) => onResendClick(e, patient)}
                          />
                        </div>
                      );
                    },
                  },
                ]}
                data={prescriptions}
                title="Prescriptions"
                actions={[
                  {
                    icon: () => <Edit />,
                    tooltip: "View Prescription Paper",
                    onClick: (event, rowData) => onClick(event, rowData),
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

Prescriptions.propTypes = {};
const mapStateToProps = (state) => ({
  prescriptions: state.prescriptions.prescriptions,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPrescriptions,
  resend,
})(withRouter(Prescriptions));
