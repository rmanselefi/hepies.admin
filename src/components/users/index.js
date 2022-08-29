import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  deleteUser,
  canSee,
  enableDisableUser,
} from "../../store/actions/user";
import { withRouter } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import Switch from "@material-ui/core/Switch";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import icons from "../shared/icons";
import swal from "sweetalert";
import moment from "moment";

const Users = ({
  history,
  getUsers,
  deleteUser,
  canSee,
  enableDisableUser,
  users: { users },
  auth: { user },
}) => {
  useEffect(() => {
    getUsers();
  });

  const name = user != null ? user?.role.name : null;

  const handleChange = async (event, row) => {
    event.preventDefault();
    const res = await enableDisableUser(row);
    if (res != null) {
      getUsers();
    }
  };

  const handleFitChange = async (event, row) => {
    event.preventDefault();
    const res = await canSee(row);
    console.log("====================================");
    console.log(res);
    console.log("====================================");
    if (res != null) {
      getUsers();
    }
  };
  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/user/register");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/user/edit",
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
      const res = await deleteUser(row.id);
      if (res != null) {
        swal("Deleted!", "User has been deleted !", "success");
      }
    }
  };

  const onHistoryClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/user/history",
      state: { detail: row },
    });
  };

  const onResetClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/user/reset",
      state: row,
    });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Users</CardTitle>
            </CardHeader>
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
                  maxBodyHeight: "450px",
                  cellStyle: {
                    fontSize: "13px",
                  },
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Name", field: "name" },
                  { title: "Username", field: "user.username" },
                  {
                    title: "Profession",
                    field: "proffesion",
                  },
                  { title: "Work Place", field: "workplace" },
                  { title: "Points", field: "points" },
                  {
                    title: "Overall Points",
                    field: "overall_points",
                  },
                  { title: "Phone", field: "phone" },
                  { title: "Email", field: "email" },
                  { title: "Sex", field: "sex" },
                  { title: "Age", field: "age" },
                  {
                    title: "Date",
                    render: (patient) => {
                      return moment(patient.createdAt).format("MM/DD/YYYY");
                    },
                    customFilterAndSearch: (term, patient) =>
                      moment(patient.createdAt)
                        .format("MM/DD/YYYY")
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                  {
                    title: "Practice License",
                    render: (row) => {
                      return (
                        <img
                          src={row.license}
                          alt={"license"}
                          height="30"
                          width="30"
                        />
                      );
                    },
                  },
                  {
                    title: "History",
                    render: (row) => {
                      return (
                        <Button
                          color="link"
                          onClick={(event) => onHistoryClick(event, row)}
                        >
                          History
                        </Button>
                      );
                    },
                  },
                  {
                    title: "Active",
                    field: "user.active",
                    render: (row) => (
                      <div>
                        <Switch
                          checked={row.user?.active === "false" ? false : true}
                          onChange={(e) => handleChange(e, row)}
                          name={"active"}
                          color="primary"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Psyco/Narco",
                    render: (row) => (
                      <div>
                        <Switch
                          checked={row.user?.isFit === "false" ? false : true}
                          onChange={(e) => handleFitChange(e, row)}
                          name={"isFit"}
                          color="primary"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Reset Password",
                    render: (row) => (
                      <div>
                        <Button
                          color="link"
                          onClick={(event) => onResetClick(event, row)}
                        >
                          Reset
                        </Button>
                      </div>
                    ),
                  },
                ]}
                data={users}
                title="Users"
                actions={
                  name === "admin" && name !== null
                    ? [
                        {
                          icon: () => <AddBox />,
                          tooltip: "Register User",
                          isFreeAction: true,
                          onClick: (event) => onAddClick(event),
                        },
                        {
                          icon: () => <Edit />,
                          tooltip: "Edit User",
                          onClick: (event, rowData) =>
                            onEditClick(event, rowData),
                        },
                        {
                          icon: () => <DeleteOutline />,
                          tooltip: "Delete User",
                          onClick: (event, rowData) =>
                            onDeleteClick(event, rowData),
                        },
                      ]
                    : null
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Users.propTypes = {};
const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getUsers,
  deleteUser,
  canSee,
  enableDisableUser,
})(withRouter(Users));
