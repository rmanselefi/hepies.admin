import React, { useEffect } from "react";
import { getDrugs, deleteDrug } from "../../store/actions/drug";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";

const Drug = ({ history, getDrugs, deleteDrug, users: { datas } }) => {
  useEffect(() => {
    getDrugs();
  }, [getDrugs]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/drug/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/drug/edit",
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
      const res = await deleteDrug(row.id);
      if (res != null) {
        swal("Deleted!", "Your Drug data has been deleted!", "success");
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
                  maxBodyHeight: "650px",
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.tableData.id + 1 },
                  { title: "Name", field: "name" },
                  { title: "Category", field: "category" },
                  { title: "Strength", field: "strength" },
                  { title: "Unit", field: "unit" },
                ]}
                data={datas}
                title="Drug datas"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Drug",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Drug",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Drug",
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

Drug.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getDrugs,
  deleteDrug,
})(withRouter(Drug));
