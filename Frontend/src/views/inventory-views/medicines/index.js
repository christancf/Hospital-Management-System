import React from "react";
import { Table, Divider, Tag, Spin, notification, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import inventoryService from "services/inventoryService";
const { confirm } = Modal;

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

  const itemdelete = (id) => {
    confirm({
      title: "Do you want to delete this item?",
      content: "When clicked the OK button, item will be deleted",
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            inventoryService
              .delete(id)
              .then((ress) => {
                openNotification("Successfull !", "item deleted");
                setTimeout(function () {
                  window.location.reload(false);
                }, 2000);
              })
              .catch((errors) => {
                openNotification("Unsuccessfull !", "deletion unsucussful");
              });
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              itemdelete(record.id);
            }}
          >
            Delete
          </a>
          <Button type="link" href={`/inventory/itemlist/update-details?id=${record.id}`}>
            Edit
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    inventoryService
      .getItems("medicines")
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
    const dataList = data.map((item) => {
      return {
        id: item.id,
        itemName: item.item_name,
        description: item.description,
        manufacturer: item.manufacturer,
        unitPrice: item.unit_price,
        totalQuantity: item.total_quantity,
      };
    });

    return (
      <>
        <div>
          <h1 className="text-left">View Medicines</h1>
          <Button type="primary" href={`/inventory/itemlist/additem/`}>
            Add New Item
          </Button>
        </div>

        <Table columns={columns} dataSource={dataList} />
      </>
    );
  }
};

export default Home;
