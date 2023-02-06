import React, { useState, useEffect, useRef } from "react";
import useComponentVisible from "../../../hooks/onclick-listner";
import downArrow from "../../../assets/SVGs/down-arow.svg";
import {
  DropDownInput,
  DropDownList,
  DropDownValue,
  DropDownListItems,
} from "./styles/dropdown";
import { defaultStyles } from "../../../constants/style-constants/utils";
export default function DropDown(props) {
  const { setSelectedItem, list, style, displayKey, name, placeholderName,value } =
    props.value || props;

  console.log("props", props);
    const { ref, isComponentVisible, handleClose, setIsComponentVisible } =
      useComponentVisible(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    value && setSearchValue(value)
  },[]);

  const filteredItems =
    list &&
    list.filter((item) => {
      return item[displayKey].toLowerCase().includes(searchValue && searchValue.toLowerCase());
    });

  const selectItem = (item) => {
    console.log("itemmm", item);
    console.log("setSelectedItem", setSelectedItem);
    setSelectedItem({ name: name, value: item[displayKey] });
    handleClose();
    // setShowDropdown(false);
  };
  return (
    <div ref={ref}>
      <DropDownInput
        style={style}
        onClick={() => {
            setIsComponentVisible(!isComponentVisible);
          // setShowDropdown(!showDropdown);
        }}
      >
        <DropDownValue
          placeholder={placeholderName || "Select"}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
        ></DropDownValue>

        <img src={downArrow} height={15} width={15}></img>
      </DropDownInput>
      {isComponentVisible && (
        <DropDownList style={style}>
          {filteredItems &&
            filteredItems.map((item, index) => (
              <DropDownListItems
                key={index}
                onClick={() => {
                  setSearchValue(item[displayKey]);

                  selectItem(item);
                }}
              >
                {item[displayKey]}
              </DropDownListItems>
            ))}
        </DropDownList>
      )}
    </div>
  );
}
