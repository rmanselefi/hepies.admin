import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  deleteUser,
  enableDisableUser,
} from "../../store/actions/user";
import { withRouter } from "react-router";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import Switch from "@material-ui/core/Switch";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import icons from "../shared/icons";
import swal from "sweetalert";

const Users = ({
  history,
  getUsers,
  deleteUser,
  enableDisableUser,
  users: { datas },
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChange = async (event, row) => {
    console.log('====================================');
    console.log(row);
    console.log('====================================');
    event.preventDefault();
    const res= await enableDisableUser(row);
    if(res!=null){
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
                  maxBodyHeight: "350px",
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Name", field: "name" },
                  { title: "Username", field: "user.username" },
                  { title: "Profession", field: "proffesion" },
                  { title: "Points", field: "points" },
                  { title: "Phone", field: "phone" },
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
                ]}
                data={datas}
                title="Users"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Register User",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit User",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete User",
                    onClick: (event, rowData) => onDeleteClick(event, rowData),
                  },
                  // {
                  //   icon: () => (
                  //     <Switch
                  //       checked={}
                  //       onChange={(e,row)=>handleChange(e,row)}
                  //       color="primary"
                  //       name="checkedB"
                  //       inputProps={{ "aria-label": "primary checkbox" }}
                  //     />
                  //   ),
                  //   tooltip: "Enable/Disable User",
                  // },
                ]}
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
  enableDisableUser,
})(withRouter(Users));
