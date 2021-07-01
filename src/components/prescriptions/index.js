import React, { useEffect } from "react";
import { getPrescriptions } from "../../store/actions/prescriptions";
import { connect } from "react-redux";
import Edit from '@material-ui/icons/RemoveRedEyeOutlined'
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { withRouter } from "react-router";
import MaterialTable from "material-table";
import icons from "../shared/icons";

const Prescriptions = ({ getPrescriptions, users: { datas }, history }) => {
  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  

  const onClick = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/admin/prescription/view",
      state: { detail: row },
    });
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
                  { title: "Dose", field: "dose" },
                  { title: "Take in", field: "takein" },
                  { title: "Frequency", field: "frequency" },
                ]}
                data={datas}
                title="Prescriptions"
                actions={[
                  {
                    icon:()=> <Edit/>,
                    tooltip: "View Prescription",
                    onClick: (event, rowData) =>
                      alert("Permission " + rowData.name),
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

Prescriptions.propTypes = {};
const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPrescriptions,
})(withRouter(Prescriptions));
