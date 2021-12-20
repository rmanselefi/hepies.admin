import React, { useEffect } from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import swal from "sweetalert";

import { Card, CardBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router";
import icons from "../shared/icons";
import { getVouchers, deleteVoucher } from "../../store/actions/voucher";

const Vouchers = ({
  history,
  getVouchers,
  deleteVoucher,
  vouchers
}) => {
  useEffect(() => {
    getVouchers();
  }, [getVouchers]);

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/admin/voucher/add");
  };

  const onEditClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/voucher/edit",
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
      const res = await deleteVoucher(row.id);
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
                  { title: "Code", field: "code" },
                  { title: "Amount", field: "amount" },
                  { title: "Status", field: "status" },
                ]}
                data={vouchers}
                title="Vouchers"
                actions={[
                  {
                    icon: () => <AddBox />,
                    tooltip: "Add Voucher",
                    isFreeAction: true,
                    onClick: (event) => onAddClick(event),
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Edit Voucher",
                    onClick: (event, rowData) => onEditClick(event, rowData),
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Voucher",
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

Vouchers.propTypes = {};

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.vouchers,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getVouchers,
  deleteVoucher,
})(withRouter(Vouchers));