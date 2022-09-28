import React, { useEffect } from "react";
import { getPharmacies, deleteDrug } from "../../../store/actions/pharmacy";
import { connect } from "react-redux";
import MaterialTable from "material-table";

import { Card, CardBody, Row, Col, FormGroup } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";

const MyPharmacies = ({
  history,
  getPharmacies,
  deleteDrug,
  location,
  pharmacies,
}) => {
  useEffect(() => {
    getPharmacies();
  }, [getPharmacies]);

  const { state } = location;

  const name = state?.name;
  const searchResult =
    pharmacies &&
    pharmacies?.filter((pharma) => {
      return pharma.drug_name?.toLowerCase().includes(name.toLowerCase());
    });
  console.log(searchResult);

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
                  pageSize: 10,
                  padding: "dense",
                  pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
                  paging: true,
                  actionsColumnIndex: -1,
                  minBodyHeight: "400px",
                  maxBodyHeight:"400px",
                  cellStyle: {
                    fontSize: "13px",
                  },
                  showEmptyDataSourceMessage: true
                }}
                isLoading={false}
                columns={[
                  { title: "#", render: (rowData) => rowData.id + 1 },
                  {
                    title: "Pharmacy/ist Name",
                    render: (data) => {
                      return `${data.profession === null ? '' : data.profession.name} ${data.profession === null ? '' : data.profession.fathername}`;
                    },
                  },
                  { title: "Drug Name", field: "drug_name" },
                  { title: "Price", field: "price" },
                ]}
                data={searchResult}
                title={"My Pharmacy"}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

MyPharmacies.propTypes = {};

const mapStateToProps = (state) => ({
  pharmacies: state.pharmacy.pharmacies,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPharmacies,
  deleteDrug,
})(withRouter(MyPharmacies));
