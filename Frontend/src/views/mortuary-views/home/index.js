// // import Button from "antd/es/button";
// // import { size } from "lodash";


// const Home = () => {
//   return (
//     <>
//       <center><h1>Mortuary Space Allocation</h1></center>
//       <br></br>
//       <Card />
//     </>
//   )
// }

// // const DisplayBox = (props) => {

// //   const styledBtn = 
// //   { backgroundColor: "green",
// //     color: "white",
// //     fontSize: "25px",
// //     padding: "20px",
// //     width: "75px",
// //     height: "75px",
// //     margin: "10px",
// //     tetxAlign: "center"
// //   }

// //   return (
// //     <>
// //       <div style={styledBtn}></div>
// //       <div style={styledBtn}></div>
// //       <div style={styledBtn}></div>
// //       <div style={styledBtn}></div>
// //       <div style={styledBtn}></div>
// //       <div style={styledBtn}></div>
// //     </>
// //   )
// // }

// export default Home;


import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Home = () => {
  return (
    <>
      <center><h1>Mortuary Space Allocation</h1></center>
      <br></br>
      <Positions />
    </>
  )
}

const DataCard = () => {
  return (
    <Card
    style={{ width: 75, height: 75 }}
    title="A1"
    // actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
  </Card>
  // mountNode 
  )
}
const DataSet = () => {
  return (
      <tr>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
        <td><DataCard/></td>
      </tr>
  )
}
const Positions = () => {
  return (
    <table style={{borderSpacing: "30px"}}>
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
      <DataSet />
    </table>
   

  )
}
export default Home;
