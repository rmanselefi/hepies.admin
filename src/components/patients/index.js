import React, { useEffect } from "react";
import { getPatients, deletePatient } from "../../store/actions/patient";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";
import RemoveRedEyeOutlined from "@material-ui/icons/RemoveRedEyeOutlined";

const Patients = ({
  history,
  getPatients,
  deletePatient,
  users: { datas },
  buttonLabel,
  className,
}) => {
  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/patient/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/patient/edit",
      state: { detail: row },
    });
  };
  const onDeleteClick = async (e, row) => {
    e.preventDefault();
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        ok: {
          text: "Yes",
        },
      },
    });

    if (willDelete) {
      console.log(row);
      const res = await deletePatient(row.id);
      if (res != null) {
        swal("Deleted!", "Your Patient data has been deleted!", "success");
      }
    }
  };

  const onViewClick = (e, row) => {
    e.preventDefault();
    console.log('====================================');
    console.log(row);
    console.log('====================================');
    history.push({
      pathname: "/admin/patient/detail",
      state: { detail: row },
    });
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
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Name", field: "name" },
                  { title: "F Name", field: "fathername" },
                  { title: "G.F Name", field: "grandfathername" },
                  { title: "Phone", field: "phone" },
                  { title: "Age", field: "age" },
                  { title: "Sex", field: "sex" },
                  { title: "Weight", field: "weight" },
                ]}
                data={datas}
                title="Patients"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add User",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Patient",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <RemoveRedEyeOutlined />,
                    tooltip: "View History",
                    onClick: (event, rowData) => onViewClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Patient",
                    onClick: (event, rowData) => onDeleteClick(event, rowData),
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

Patients.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPatients,
  deletePatient,
})(withRouter(Patients));
