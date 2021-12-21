import React, { useEffect } from "react";
import { getUserHistory } from "../../../store/actions/user";
import { connect } from "react-redux";
import MaterialTable from "material-table";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";

const UserHistory = ({
  getUserHistory,
  location,
  users: { datas },
}) => {
  const { state } = location;

  const id = state.detail.id;
  const type = state.detail.profession;
  useEffect(() => {
    getUserHistory(id, type);
  }, [getUserHistory, id, type]);

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
                  maxBodyHeight: "650px",
                  cellStyle: {
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
                    title: "Drug",
                    render: (row) => {
                      return `${row.drug?.name} , ${row.drug?.strength}${row.drug?.unit}`;
                    },
                  },
                  { title: "Code", field: "code" },
                  { title: "Take in", field: "takein" },
                  { title: "Frequency", field: "frequency" },
                ]}
                data={datas}
                title={"My Pharmacy for " + state.detail.name}
                // actions={[
                //   {
                //     icon: () => <AddBox />,
                //     tooltip: "Add Drug",
                //     isFreeAction: true,
                //     onClick: (event) => onAddClick(event),
                //   },
                //   {
                //     icon: () => <Edit />,
                //     tooltip: "Edit Drug",
                //     onClick: (event, rowData) => onEditClick(event, rowData),
                //   },
                //   {
                //     icon: () => <DeleteOutline />,
                //     tooltip: "Delete Drug",
                //     onClick: (event, rowData) => onDeleteClick(event, rowData),
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

UserHistory.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getUserHistory,
})(withRouter(UserHistory));
