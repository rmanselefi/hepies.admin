// import * as React from "react";
// import Box from "@material-ui/core/Box";
// import Tab from "@material-ui/core/Tab";
// import TabContext from "@material-ui/lab/TabContext";
// import TabList from "@material-ui/lab/TabList";
// import TabPanel from "@material-ui/lab/TabPanel";
// import GeneralPrescriptions from "./types/general";
// import InstrumentPrescriptions from "./types/instrument";
// import NarcoticPrescriptions from "./types/narcotic";
// import PsychotropicPrescriptions from "./types/psychotropic";

// export default function LabTabs() {
//   const [value, setValue] = React.useState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className="content">
//       <Box sx={{ width: "100%", typography: "body1" }}>
//         <TabContext value={value}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <TabList onChange={handleChange} aria-label="lab API tabs example">
//               <Tab label="General" value="1" />
//               <Tab label="Psychotropic" value="2" />
//               <Tab label="Narcotic" value="3" />
//               <Tab label="Instrument" value="4" />
//             </TabList>
//           </Box>
//           <TabPanel value="1">
//             <GeneralPrescriptions />
//           </TabPanel>
//           <TabPanel value="2">
//             <PsychotropicPrescriptions />
//           </TabPanel>
//           <TabPanel value="3">
//             <NarcoticPrescriptions />
//           </TabPanel>
//           <TabPanel value="4">
//             <InstrumentPrescriptions />
//           </TabPanel>
//         </TabContext>
//       </Box>
//     </div>
//   );
// }

import * as React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import GeneralPrescriptions from "./types/general";
import InstrumentPrescriptions from "./types/instrument";
import NarcoticPrescriptions from "./types/narcotic";
import PsychotropicPrescriptions from "./types/psychotropic";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div className="content">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Psychotropic
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Narcotic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Instrument
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <GeneralPrescriptions />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <PsychotropicPrescriptions />
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <NarcoticPrescriptions />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <InstrumentPrescriptions />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
