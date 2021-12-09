import React, { useEffect } from "react";
import {
  getPharmacists,
  getMyPharmacyById,
  deleteDrug,
} from "../../../store/actions/pharmacy";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";

import { Card, CardBody, Row, Col, NavLink, Button } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";

const MyPharmacy = ({
  history,
  getPharmacists,
  getMyPharmacyById,
  deleteDrug,
  location,
  users: { datas },
}) => {
  const { state } = location;
 
  const id = state.detail.id;
  useEffect(() => {
    getMyPharmacyById(id);
  }, [getMyPharmacyById, id]);

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
      const res = await deleteDrug(row.id);
      if (res != null) {
        swal("Deleted!", "Your Pharmacy data has been deleted!", "success");
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
                  cellStyle: {
                    fontSize: "13px",
                  },
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.id + 1 },
                  { title: "Drug Name", field: "drug_name" },
                  { title: "Price", field: "price" },
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

MyPharmacy.propTypes = {};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getMyPharmacyById,
  deleteDrug,
})(withRouter(MyPharmacy));
