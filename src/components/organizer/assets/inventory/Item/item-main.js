import React, { useState } from "react";
import tag from "./tag/tag";
import value from "./value/value";
import warranty from "./warranty/warranty";
import itemAdd from "./item-add";
import FormHeader from "../../../../styled-components/form-header/form-header";
import RightSidebar from "../../../../styled-components/right-sidebar/right-sidebar";
import useActiveTabs from "../../../../../hooks/active-tabs";

function itemMain() {
  const [activeTabData, setActiveTabData] = useState({
    name: "generalInformation",
    title: "General Information",
    unique: "firstName",
    isMulti: false,
    component: itemAdd,
  });

  const ActiveComponent = activeTabData.component;

  const [rightToggleClass, setRightToggleClass] = useState(false);
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };

  const itemsAddData = {
    generalInformation: {
      name: "generalInformation",
      title: "General Information",
      unique: "firstName",
      isMulti: false,
      component: itemAdd,
      data: [
        {
          Name: "Alaska",
          "Universal Product Code": "Enter Universal Product Code",
          "Serial Number": "Enter Serial Number here",
          Owner: "Enter Owner name",
          Brand: "Enter Brand Name Here",
          Model: "Enter Model Number Here",
          "Special Features": "Enter Special Features Here",
        },
      ],
    },
    value: {
      name: "valueDetails",
      title: "Value",
      unique: "matric",
      isMulti: true,
      component: value,
      data: [
        {
          Quantity: "Enter Quantity Here",
          "Price Paid": "Enter Price Paid Here",
          "Current Value": "Enter Current Value Here",
          Condition: "Select",
          "Appreciation/Depreciation": "200",
          "Appraisal Source": "Enter Appraisal Source",
          "Appraisal Date": "Select Appraisal Date",
        },
      ],
    },
    warranty: {
      name: "warranty",
      title: "Warranty",
      unique: "firstName",
      component: warranty,
      isMulti: false,
      data: [
        {
          "Purchase Date": "Select Purchase Date",
          "Purchase Location": "Enter Purchase Location Here",
          "Warranty Providers": "Enter Warranty Providers Here",
        },
        {
          "Warranty Period": "Enter Warranty Period Here",
          "Customer Support Phone": "Enter Phone Here",
          "Website URL": "Enter Website URL Here",
        },
        {
          "Return Date": "Enter Return Date",
          Receipt: "Upload Receipt Here",
        },
      ],
    },
    tag: {
      name: "tag",
      title: "Tag",
      unique: "matric",
      isMulti: false,
      component: tag,
      data: [
        {
          "Tag Name": "Enter Tag Name",
        },
      ],
    },
  };

  const [allFormsData, setAllFormsData] = useState(itemsAddData);

  const tabsArray = Object.values(itemsAddData);
  const [activeTabsArray, setActiveTabsArray] = useState([
    "generalInformation",
  ]);

  //  pass all tabs array and selected tab name to useActiveTabs hook
  //  useActiveTabs Hook will return all previous tabs with selected tab
  const handleActiveTabsArray = (name) => {
    const activeTabs = useActiveTabs(tabsArray, name);

    setActiveTabsArray([...activeTabs]);
  };

  const nextForm = (nextFormData) => {
    setActiveTabData(nextFormData);

    const activeTabs = useActiveTabs(tabsArray, nextFormData.name);

    setActiveTabsArray([...activeTabs]);
  };
  const preForm = (previousFormData) => {
    setActiveTabData(previousFormData);

    const activeTabs = useActiveTabs(tabsArray, previousFormData.name);

    setActiveTabsArray([...activeTabs]);
  };

  // pass all form data of one component and update in main object (allFormsData)
  const handleItemsAddObject = (pageData) => {
    // setAllFormsData((formData) => {
    //   return {
    //     ...formData,
    //     [activeTabData.name]: {
    //       ...formData[activeTabData.name],
    //       [activeTabData.name]: activeTabData.isMulti
    //         ? {
    //             ...formData[activeTabData.name][activeTabData.name],
    //             [pageData[activeTabData.unique]]: pageData,
    //           }
    //         : { [pageData[activeTabData.unique]]: pageData },
    //     },
    //   };
    // });

    setAllFormsData((formData) => {
      return {
        ...formData,
        [activeTabData.name]: {
          ...formData[activeTabData.name],
          data: activeTabData.isMulti ? pageData : [pageData],
        },
      };
    });
  };

  console.log("allFormsData", allFormsData);

  return (
    <>
      <div
        className={
          rightToggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <FormHeader
            headerData={itemsAddData}
            activeTabData={activeTabData}
            setActiveTabData={setActiveTabData}
            activeTabsArray={activeTabsArray}
            handleActiveTabsArray={handleActiveTabsArray}
          />
        </div>
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <ActiveComponent
            handleItemsAddObject={handleItemsAddObject}
            data={allFormsData}
            nextForm={nextForm}
            preForm={preForm}
            activeTabData={activeTabData}
          />
        </div>
        <div className="form-page--right-side custom">
          <span
            className="right-side-collapse-icon"
            onClick={handleRightToggleClass}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            <RightSidebar data={allFormsData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default itemMain;
