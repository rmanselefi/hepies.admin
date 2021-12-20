import React, { useEffect } from "react";
import {
  getGuidelines,
  deleteGuideline,
} from "../../store/actions/guidelinesActions";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";

const Guidelines = ({
  history,
  getGuidelines,
  deleteGuideline,
  guidelines,
}) => {
  useEffect(() => {
    getGuidelines();
  }, [getGuidelines]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/guideline/add");
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
      const res = await deleteGuideline(row.id);
      if (res != null) {
        swal("Deleted!", "Your Guideline data has been deleted!", "success");
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
                  { title: "#", render: (rowData) => rowData.id + 1 },
                  { title: "File", field: "name" },
                ]}
                data={guidelines}
                title="Guidelines List"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add GuideLine",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete GuideLine",
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

Guidelines.propTypes = {};

const mapStateToProps = (state) => ({
  guidelines: state.guidelines.guidelines,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getGuidelines,
  deleteGuideline,
})(withRouter(Guidelines));
