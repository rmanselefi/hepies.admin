import React, { useEffect } from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from 'sweetalert'

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";
import { getPoints, deletePoint } from "../../store/actions/points";

const Points = ({ history, getPoints,deletePoint, points }) => {
  useEffect(() => {
    getPoints();
  }, [getPoints]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/point/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/point/edit",
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
      const res = await deletePoint(row.id);
      if (res != null) {
        swal("Deleted!", "Your Point data has been deleted!", "success");
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
                  { title: "Point", field: "point" },
                  { title: "When", field: "when" },
                  { title: "To", field: "to" },
                ]}
                data={points}
                title="Patients"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Point",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Point",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Point",
                    onClick: (event, rowData) =>onDeleteClick(event,rowData)
                     
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

Points.propTypes = {};

const mapStateToProps = (state) => ({
  points: state.points.points,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPoints,deletePoint
})(withRouter(Points));
