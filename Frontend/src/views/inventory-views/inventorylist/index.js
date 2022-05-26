import React from "react";
import { Table, Divider, Tag, Spin, notification, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import inventoryService from "services/inventoryService";
import { INVENTORY_PREFIX_PATH, APP_PREFIX_PATH, INVENTORY_ROLE, ValidateUser } from 'configs/AppConfig';
const { confirm } = Modal;

ValidateUser(INVENTORY_ROLE);


const openNotification = (title, content) => {
  notification.open({
    message: title,
    description: content,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

//   const itemdelete = (id) => {
//     confirm({
//       title: "Do you want to delete this item?",
//       content: "When clicked the OK button, item will be deleted",
//       async onOk() {
//         try {
//           return await new Promise((resolve, reject) => {
//             inventoryService
//               .delete(id)
//               .then((ress) => {
//                 openNotification("Successfull !", "item deleted");
//                 setTimeout(function () {
//                   window.location.reload(false);
//                 }, 2000);
//               })
//               .catch((errors) => {
//                 openNotification("Unsuccessfull !", "deletion unsucussful");
//               });
//             setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//           });
//         } catch {
//           return console.log("Oops errors!");
//         }
//       },
//       onCancel() {},
//     });
//   };

  const columns = [
    
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "item_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Manufacture Date",
      dataIndex: "manufacture_date",
      key: "manufacture_date",
    },
    {
      title: "Expire Date",
      dataIndex: "expire_date",
      key: "expire_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
	// {
	// 	title: 'Action',
	// 	key: 'action',
	// 	render: (text, record) => (
	// 		<span>
	// 		<Button type="link" href={`/inventory/itemlist/update-details?id=${record.id}`}>
	// 		  Edit
	// 		</Button>
	// 	  </span>
	// 	),
	// },
    // {
    //   title: "Action",
    //   key: "action",
//       render: (text, record) => (
//         // <span>
//         //   <a
//         //     onClick={() => {
//         //       itemdelete(record.id);
//         //     }}
//         //   >
//         //     Delete
//         //   </a>
//         //   <Button type="link" href={`/inventory/itemlist/update-details?id=${record.id}`}>
//         //     Edit
//         //   </Button>
//         // </span>
//       //),
//     },
  ];

  useEffect(() => {
    inventoryService
      .getInventoryItems()
      .then((resp) => {
        setData(resp.payload);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);

  if (loading) {
    return (
      <>
        <center>
          <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
        </center>
      </>
    );
  } else if (error) {
    return (
      <>
        <center>
          <Spin size="large" tip="Loading..." delay={500} spinning={loading} />
        </center>
      </>
    );
  } else {
    const dataList = data.map((inventoryItem) => {
		if(inventoryItem.quantity == 0) {
			inventoryItem.status = "Unavailable"
		} else {
			inventoryItem.status = "Available"
		}
      return {
        //itemId: inventoryItem.item_id,
        itemName: inventoryItem.item_name,
        quantity: inventoryItem.quantity,
        manufacture_date: new Date(inventoryItem.manufacture_date).toLocaleDateString(),
        expire_date: new Date(inventoryItem.expire_date).toLocaleDateString(),
        status: inventoryItem.status,
      };
    });

    return (
      <>
        <div>
          <h1 className="text-left">Inventory List</h1>
		  <Button type="primary" href={`/inventory/inventorylist/add/`}>
            Add New Batch          </Button>
          
        </div>

        <Table columns={columns} dataSource={dataList} />
      </>
    );
  }
};

export default Home;
