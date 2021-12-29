import React, { useEffect } from "react";
import {
  getLikesForConsult,
  deleteConsult,
} from "../../../store/actions/consults";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import swal from "sweetalert";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../../shared/icons";
import moment from "moment";

const Likes = ({
  history,
  location,
  getLikesForConsult,
  deleteConsult,
  likes,
  auth: { user },
}) => {
  const {
    state: { detail },
  } = location;
  const id = detail.id;
  useEffect(() => {
    getLikesForConsult(id);
  }, [getLikesForConsult, id]);
  const name = user != null ? user?.role.name : null;

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/consult/post");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/consult/edit",
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
      const res = await deleteConsult(row.id);
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
                  maxBodyHeight: "350px",
                  headerStyle: {
                    width: "50px",
                  },
                  cellStyle: {
                    fontSize: "13px",
                  },
                }}
                isLoading={false}
                columns={[
                  {
                    title: "#",
                    render: (rowData) => rowData.tableData.id + 1,
                    headerStyle: {
                      width: "10px",
                    },
                  },
                  { title: "Username", field: "user.username", },
                 
                  {
                    title: "Date",
                    render: (patient) => {
                      return moment(patient.createdAt).format("MM/DD/YYYY");
                    },
                    customFilterAndSearch: (term, patient) =>
                      moment(patient.createdAt)
                        .format("MM/DD/YYYY")
                        .toLowerCase()
                        .includes(term.toLowerCase()),
                  },
                ]}
                data={likes}
                title="Likes data"
                // actions={
                //   name === "admin" && name !== null
                //     ? [
                //         {
                //           icon: () => <AddBox />,
                //           tooltip: "Send Consult",
                //           isFreeAction: true,
                //           onClick: (event) => onAddClick(event),
                //         },
                //         {
                //           icon: () => <Edit />,
                //           tooltip: "Edit Consult",
                //           onClick: (event, rowData) =>
                //             onEditClick(event, rowData),
                //         },
                //         {
                //           icon: () => <DeleteOutline />,
                //           tooltip: "Delete Consult",
                //           onClick: (event, rowData) =>
                //             onDeleteClick(event, rowData),
                //         },
                //       ]
                //     : null
                // }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Likes.propTypes = {};

const mapStateToProps = (state) => ({
  likes: state.consults.likes,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getLikesForConsult,
  deleteConsult,
})(withRouter(Likes));
