import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPharmacists, deleteDrug } from "../../store/actions/pharmacy";
import { connect } from "react-redux";
import MaterialTable from "material-table";

import { Card, CardBody, Row, Col, Button, FormGroup } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";
import { AvField, AvForm } from "availity-reactstrap-validation";

const Pharmacy = ({ history, getPharmacists, deleteDrug, pharmacies }) => {
  useEffect(() => {
    getPharmacists();
  }, [getPharmacists]);

  const [name, setName] = useState("");

  const onMyPharmacyClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/pharmacy/mypharmacy",
      state: { detail: row },
    });
  };

  const onSearchClick = (e, name) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/pharmacy/search",
      state: { name },
    });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <AvForm>
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Drug Name</label>
                  <AvField
                    placeholder="Drug Name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    name="name"
                    required
                  />
                </FormGroup>
              </Col>
              <Col
                className="pr-1"
                md="6"
                style={{
                  position: "relative",
                  top: "21px",
                }}
              >
                <label></label>
                <Button
                  className="btn-round"
                  color="primary"
                  type="button"
                  disabled={!name}
                  onClick={(e) => onSearchClick(e, name)}
                >
                  Search My Pharmacy
                </Button>
              </Col>
            </Row>
          </AvForm>
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
                  {
                    title: "Pharmacy/ist Name",
                    render: (patient) => {
                      return (
                        <Link
                          title={`${patient?.name} ${patient?.fathername}`}
                          to={{
                            pathname: "/admin/pharmacy/profile",
                            state: { detail: patient },
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >{`${patient?.name} ${patient?.fathername}`}</Link>
                      );
                    },
                    customFilterAndSearch: (term, patient) =>
                      `${patient?.name} ${patient?.fathername}`
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },

                  { title: "Phone", field: "phone" },
                  { title: "Points", field: "points" },
                  {
                    title: "My Pharmacy",
                    render: (rowData) => {
                      return (
                        <Button
                          color="link"
                          onClick={(event) => onMyPharmacyClick(event, rowData)}
                        >
                          My Pharmacy
                        </Button>
                      );
                    },
                  },
                ]}
                data={pharmacies}
                title="Pharmacies"
                // actions={[
                //   {
                //     icon: () => <AddBox />,
                //     tooltip: "Add Pharmacy",
                //     isFreeAction: true,
                //     onClick: (event) => onAddClick(event),
                //   },
                //   {
                //     icon: () => <Edit />,
                //     tooltip: "Edit Pharmacy",
                //     onClick: (event, rowData) => onEditClick(event, rowData),
                //   },
                //   {
                //     icon: () => <DeleteOutline />,
                //     tooltip: "Delete Pharmacy",
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

Pharmacy.propTypes = {};

const mapStateToProps = (state) => ({
  pharmacies: state.pharmacy.pharmacies,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPharmacists,
  deleteDrug,
})(withRouter(Pharmacy));
