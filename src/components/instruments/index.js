import React, { useEffect } from "react";
import { getInstruments, deleteDrug } from "../../store/actions/drug";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";

import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";

const Instruments = ({
  history,
  getInstruments,
  deleteDrug,
  instruments,
  auth: { user },
}) => {
  useEffect(() => {
    getInstruments();
  }, [getInstruments]);

  const name = user != null ? user?.role.name : null;
  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/instrument/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/instrument/edit",
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
                  { title: "#", render: (rowData) => rowData.id + 1 },
                  {
                    title: "Type",
                    field: "type",
                  },
                  { title: "Material Name", field: "material_name" },
                  {
                    title: "Size",
                    render: (rowData) => {
                      let data = rowData.size;
                      return data;
                    },
                  },
                  { title: "How Many", field: "how_many" },
                ]}
                data={instruments}
                title="Instrument datas"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Drug",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  name === "admin" && name !== null
                    ? {
                        icon: () => <Edit />,
                        tooltip: "Edit Drug",
                        onClick: (event, rowData) =>
                          onEditClick(event, rowData),
                      }
                    : null,
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

Instruments.propTypes = {};

const mapStateToProps = (state) => ({
  instruments: state.drugs.instruments,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getInstruments,
  deleteDrug,
})(withRouter(Instruments));
