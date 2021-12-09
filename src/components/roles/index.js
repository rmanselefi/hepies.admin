import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRoles, deleteRole } from "../../store/actions/roles";
import { withRouter } from "react-router";
import { Card, CardBody, Row, Col } from "reactstrap";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import icons from "../shared/icons";
import swal from "sweetalert";

const Roles = ({ getRoles, history, deleteRole, users: { datas } }) => {
  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/role/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/role/edit",
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
      const res = await deleteRole(row.id);
      if (res != null) {
        swal("Deleted!", "Your role data has been deleted!", "success");
      }
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
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Name", field: "name" },
                ]}
                data={datas}
                title="Lookup datas"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Role",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Role",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Role",
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

Roles.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getRoles,
  deleteRole,
})(withRouter(Roles));
