import React, { useEffect } from "react";
import { getMyPharmacyById, deleteDrug } from "../../../store/actions/pharmacy";
import { connect } from "react-redux";
import MaterialTable from "material-table";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";

const MyPharmacy = ({
  history,
  getPharmacists,
  getMyPharmacyById,
  deleteDrug,
  location,
  pharmacies,
}) => {
  const { state } = location;

  const id = state.detail.id;
  useEffect(() => {
    getMyPharmacyById(id);
  }, [getMyPharmacyById, id]);

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
                data={pharmacies}
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
  pharmacies: state.pharmacy.pharmacies,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getMyPharmacyById,
  deleteDrug,
})(withRouter(MyPharmacy));
