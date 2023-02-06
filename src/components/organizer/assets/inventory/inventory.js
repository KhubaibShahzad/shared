import React, { useState } from "react";
import { MODULE_API } from "../../../../apis";
import * as Style from "../inventory/styles/inventory";
import asset from "../../../../assets/images/asset.png";
import retirement from "../../../../assets/images/retirement2.png";
import tableimg from "../../../../assets/images/big/img1.jpg";
import Loader from "../../../styled-components/loader/loader";
import { Modal, Form, Button } from "antd";
import PropertyAdd from "./property/property-add";
import RoomAdd from "./Room/room-add";
import ROUTES from "../../../../config/routes";
import ItemAdd from "./Item/item-add";
import { useHistory } from "react-router-dom";

function inventory(props) {
  const [allProperties, setAllProperties] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allHeading, setHeading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showPropertyAdd, setShowPropertyAdd] = useState(false);
  const [showRoomAdd, setShowRoomAdd] = useState(false);
  const [showItemAdd, setShowItemAdd] = useState(false);

  const history = useHistory();

  React.useEffect(() => {
    inventoryReport();
  }, []);

  let propertiesList = [];
  let roomsList = [];
  let rooms = [];
  const styles = {
    hidescroll: {
      width: "100%",
      overflow: "hidden",
    },
    container: {
      width: "100%",
      overflowX: "auto",
      paddingBottom: 20,
      marginBottom: -20,
    },
  };

  async function addProperty() {
    setShowPropertyAdd(true);
    setModal(true);
  }

  async function addRoom() {
    setShowRoomAdd(true);
    setModal(true);
  }

  async function addItem() {
    setShowItemAdd(true);
    history.push(`/add_item`);
    // setModal(true);
  }

  async function fetchItem(itemsList) {
    console.log("item object", itemsList);
    setIsLoading(true);
    let item = await MODULE_API.fetchRooms({
      id: itemsList.id,
      body: {},
    });
    console.log("rooms listing", item);
    setIsLoading(false);
    item =
      item.data &&
      item.data.children.map((items) => ({
        id: items.id,
        room: item.data ? item.data.name : "N/A",
        name: items.name ? items.name : "N/A",
        quantity: items.quantity ? items.quantity : "N/A",
        value: item.data ? item.data.total : 0,
        currentValue: items.currentValue,
        img: items.images && items.images[0] ? items.images[0] : tableimg,
      }));
    setAllItems(item);
    setShowItems(true);
    console.log("items listing", item);
  }

  async function fetchRoom(item) {
    console.log("item object", item);
    setIsLoading(true);
    let room = await MODULE_API.fetchRooms({
      id: item.id,
      body: {},
    });
    setIsLoading(false);

    console.log("rooms listing", room);
    // roomsList =
    //   room.data &&
    //   room.data.map((property) => ({
    //     propertyName: property.name,
    //     room: rooms,
    //   }));
    rooms =
      room.data &&
      room.data.children.map((room) => ({
        id: room.id,
        room: room.data ? room.data.name : "N/A",
        name: room.name ? room.name : "N/A",
        value: room.total ? room.total : 0,
        img: room.images && room.images[0] ? room.images[0] : tableimg,
      }));
    console.log("rooms", rooms);
    setAllRooms(rooms);
    setHeading(true);
  }

  async function inventoryReport() {
    setIsLoading(true);
    let inventories = await MODULE_API.fetchItems({
      moduleName: "PROPERTY",
      pageNum: 1,
      limit: 100,
      body: {},
    });
    setIsLoading(false);

    console.log("inventories", inventories);
    propertiesList =
      inventories &&
      inventories.records.map((properties) => ({
        id: properties.id,
        name: properties.name,
        total: properties.total ? properties.total : 0,
        img:
          properties.images && properties.images[0]
            ? properties.images[0]
            : tableimg,
        description:
          "Lorem Ipsum Lorem Ipsum Lorem Ipsum, Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      }));
    setAllProperties(propertiesList);
    console.log("propertiesList", propertiesList);
  }

  async function setVisible() {
    setModal(false);
  }

  return (
    <div>
      <Style.Main>
        <Style.SubMain>
          <div>
            <h3 style={{ fontWeight: "bold" }}>Inventory Report</h3>
          </div>
          <Style.Container>
            <Style.Heading>
              <Style.Subheading>
                <h4
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    paddingTop: "8px",
                  }}
                >
                  All Inventory
                </h4>
              </Style.Subheading>
              <Style.Image>
                <span>
                  <img src={asset} style={{ width: "5rem" }} />
                </span>
              </Style.Image>
            </Style.Heading>
            <Style.SubContainer>
              <Style.Title style={{ width: "10rem" }}>
                <Style.Text>Client Name</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text>Danish Asim</Style.Text>
              </Style.Data>
            </Style.SubContainer>
            <Style.SubContainer>
              <Style.Title style={{ width: "10rem" }}>
                <Style.Text>Todays Date</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text>12 December, 2022</Style.Text>
              </Style.Data>
            </Style.SubContainer>
          </Style.Container>
          <Style.Container>
            <Style.Heading>
              <Style.Count>
                <div style={{ width: "100%", display: "flex" }}>
                  <Style.Sign>
                    <Style.Text
                      style={{ color: "white", paddingTop: "0.5rem" }}
                    >
                      $
                    </Style.Text>
                  </Style.Sign>
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "center",
                      paddingRight: "1rem",
                    }}
                  >
                    <Style.Text
                      style={{
                        paddingTop: "0.7rem",
                        color: "#39b54a",
                        fontWeight: "bold",
                      }}
                    >
                      1,450,000
                    </Style.Text>
                  </div>
                </div>
              </Style.Count>
            </Style.Heading>
            <Style.SubContainer>
              <Style.Title style={{ width: "10rem" }}>
                <Style.Text>Spouse Name</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text>None</Style.Text>
              </Style.Data>
            </Style.SubContainer>
            <Style.SubContainer>
              <Style.Title style={{ width: "12rem" }}>
                <Style.Text>Plan Nickname</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text>None</Style.Text>
              </Style.Data>
            </Style.SubContainer>
          </Style.Container>
        </Style.SubMain>

        <Style.Cards>
          <Style.SubCards
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Style.CardsHead>
              <h3 style={{ fontWeight: "bold" }}>Properties</h3>
            </Style.CardsHead>
            <Style.PropertyAdd
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "11rem",
              }}
            >
              <div>
                <h3>Add Property</h3>
              </div>
              <Style.AddBtn onClick={() => addProperty()}>
                <h3 style={{ color: "white" }}>+</h3>
              </Style.AddBtn>
            </Style.PropertyAdd>
          </Style.SubCards>
          <Style.CardsMain
            style={{
              width: "99%",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "3.9rem",
              overflow: "hidden",
              overflowX: "auto",
              paddingBottom: 20,
              marginBottom: -20,
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            {allProperties &&
              allProperties.map((item, index) => (
                <Style.Card onClick={() => fetchRoom(item)}>
                  <div>
                    <Style.Img
                      src={item.img}
                      style={{
                        width: "100%",
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                        height: "15rem",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "1rem 0.5rem 0 1rem",
                    }}
                  >
                    <div style={{ paddingTop: "1rem" }}>
                      <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "21px" }}
                          icon="edit"
                        ></Button>
                      </div>
                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "21px" }}
                          icon="delete"
                        ></Button>
                      </div>
                    </div>
                  </div>
                  <Style.Desc>
                    <p>{item.description}</p>
                  </Style.Desc>
                  <Style.Count>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign>
                        <h3 style={{ color: "white", paddingTop: "0.5rem" }}>
                          $
                        </h3>
                      </Style.Sign>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          paddingRight: "1rem",
                        }}
                      >
                        <h3
                          style={{
                            paddingTop: "0.5rem",
                            color: "#39b54a",
                            fontWeight: "bold",
                          }}
                        >
                          {item.total}
                        </h3>
                      </div>
                    </div>
                  </Style.Count>
                </Style.Card>
              ))}
          </Style.CardsMain>
        </Style.Cards>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
          }}
        >
          {allHeading ? (
            <Style.SubCards
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Style.CardsHead>
                <h3 style={{ fontWeight: "bold" }}>Inventory Details</h3>
              </Style.CardsHead>
            </Style.SubCards>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1rem",
            columnGap: "1rem",
          }}
        >
          <Style.Rooms>
            {allHeading ? (
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "28rem",
                }}
              >
                <div>
                  <h3>Add Room</h3>
                </div>
                <Style.AddBtn onClick={() => addRoom()}>
                  <h3 style={{ color: "white" }}>+</h3>
                </Style.AddBtn>
              </Style.PropertyAdd>
            ) : null}

            {allRooms.map((item, index) => (
              <Style.SubRoom
                onClick={() => fetchItem(item)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "1rem",
                  height: "7rem",
                }}
              >
                <div>
                  <img
                    src={item.img}
                    style={{
                      width: "10rem",
                      borderRadius: "1rem",
                      height: "7rem",
                    }}
                  />
                </div>
                <Style.DataContainer
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    columnGap: "3rem",
                    height: "4.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "7rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Room:
                        </p>
                      </div>
                      <div>
                        <p>{item.name}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "8rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Property:
                        </p>
                      </div>
                      <div style={{ paddingRight: "2rem" }}>
                        <p>{item.room}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "5rem",
                        paddingLeft: "1rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Value:
                        </p>
                      </div>
                      <div style={{ paddingRight: "0rem" }}>
                        <p>{item.value}</p>
                      </div>
                    </div>
                    <Style.Action>
                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "16px" }}
                          icon="edit"
                        ></Button>
                      </div>
                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "16px" }}
                          icon="delete"
                        ></Button>
                      </div>
                    </Style.Action>
                  </div>
                </Style.DataContainer>
              </Style.SubRoom>
            ))}
          </Style.Rooms>

          <div
            style={{
              display: "flex",
              width: "69%",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            {showItems ? (
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>
                  <h3>Add Item</h3>
                </div>
                <Style.AddBtn onClick={() => addItem()}>
                  <h3 style={{ color: "white" }}>+</h3>
                </Style.AddBtn>
              </Style.PropertyAdd>
            ) : null}
            {allItems.map((item, index) => (
              <Style.SubRoom
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "1rem",
                  maxHeight: "7rem",
                }}
              >
                <div>
                  <img
                    src={item.img}
                    style={{
                      width: "10rem",
                      borderRadius: "1rem",
                      height: "7rem",
                    }}
                  />
                </div>
                <Style.ItemsData>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "7rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Item:
                        </p>
                      </div>
                      <div style={{ paddingRight: "1rem" }}>
                        <p>{item.name}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "8rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Quantity:
                        </p>
                      </div>
                      <div style={{ paddingRight: "2.4rem" }}>
                        <p>{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "7rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Property:
                        </p>
                      </div>
                      <div style={{ paddingRight: "1rem" }}>
                        <p>N/A</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "8rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Room:
                        </p>
                      </div>
                      <div style={{ paddingRight: "1rem" }}>
                        <p>{item.room}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "9rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Current Value:
                        </p>
                      </div>
                      <div style={{ paddingRight: "1rem" }}>
                        <p>{item.currentValue}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "8rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          Total Value:
                        </p>
                      </div>
                      <div style={{ paddingRight: "1rem" }}>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  </div>
                </Style.ItemsData>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "7rem",
                    padding: "0 2rem 3.1rem 0",
                  }}
                >
                  <div className="custom-field-alignments-icons">
                    <Button
                      type="link"
                      style={{ fontSize: "16px" }}
                      icon="edit"
                    ></Button>
                  </div>
                  <div className="custom-field-alignments-icons">
                    <Button
                      type="link"
                      style={{ fontSize: "16px" }}
                      icon="delete"
                    ></Button>
                  </div>
                </div>
              </Style.SubRoom>
            ))}
          </div>
        </div>
      </Style.Main>
      <div>
        <Modal
          width={"58rem"}
          visible={isModal}
          footer={null}
          closeIcon={setVisible}
        >
          {showPropertyAdd ? <PropertyAdd /> : <RoomAdd />}
        </Modal>
      </div>

      <Loader isLoading={isLoading} />
    </div>
  );
}

export default inventory;
