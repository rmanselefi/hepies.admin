import React, { useEffect } from "react";
import { getLookups, deleteLookup } from "../../store/actions/lookup";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";
import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";

const Lookup = ({ history, getLookups, deleteLookup, lookup }) => {
  useEffect(() => {
    getLookups();
  }, [getLookups]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/lookup/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/lookup/edit",
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
      const res = await deleteLookup(row.id);
      if (res != null) {
        swal("Deleted!", "Your Lookup data has been deleted!", "success");
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
                  { title: "Value", field: "value" },
                ]}
                data={lookup}
                title="Lookup datas"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Lookup",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Lookup",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Lookup",
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

Lookup.propTypes = {};

const mapStateToProps = (state) => ({
  lookup: state.lookup.lookups,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getLookups,
  deleteLookup,
})(withRouter(Lookup));
