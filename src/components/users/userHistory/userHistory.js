import React, { useEffect } from "react";
import { getUserHistory } from "../../../store/actions/user";
import { connect } from "react-redux";
import MaterialTable from "material-table";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";

const UserHistory = ({ getUserHistory, location, userHistories }) => {
  const { state } = location;

  const id = state.detail.id;
  const type = state.detail.profession;
  useEffect(() => {
    getUserHistory(id, type);
  }, [getUserHistory, id, type]);

  const exportData = userHistories.map((data) => {
    var newObj = {
      patient: `${data.patient?.name} ${data.patient?.fathername}`,
      phone: data.patient?.phone,
    };
    return {
      ...data,
      ...newObj,
    };
  });

  console.log("==============exportData======================");
  console.log(exportData);
  console.log("==============exportData======================");
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
                  exportButton: true,
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  {
                    title: "Prescribed By",
                    field: "professional",
                  },
                  {
                    title: "Patient",
                    field: "patient",
                  },
                  {
                    title: "Phone Number",
                    field: "phone",
                  },
                  {
                    title: "Drug",
                    field: "drug_name",
                  },
                  { title: "Code", field: "code" },
                  { title: "Take in", field: "takein" },
                  { title: "Frequency", field: "frequency" },
                ]}
                data={exportData}
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
  userHistories: state.users.userHistories,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getUserHistory,
})(withRouter(UserHistory));
