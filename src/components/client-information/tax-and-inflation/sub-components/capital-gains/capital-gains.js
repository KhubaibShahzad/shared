import React, { useState } from "react";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import IconInput from "../../../../styled-components/input/icon-input";
import { Text } from "../../../../styled-components/text";
import * as Style from "./styles/capital-gains";
import { Button } from "../../../../styled-components/button";
import CarryForward from "../carry-forward/carry-forward";
import TaxCredits from "../tax-credits/tax-credits";
import { InputGroup } from "../../../../styled-components/input/styles/input";

function CapitalGains({handleTaxInflationObject,nextForm,preForm,data}) {

  const uniqueKey = Object.keys(data.capitalGains.data)[0];
  const capitalGainObj = data.capitalGains.data[uniqueKey];
  // const capitalGainObj = {
  //   subjectToCapGains: "",
  //   gainsRateFederal: "",
  //   gainsRateState: "",
  // };


  const capitalGainObjMain = {
    "Subject to Cap Gains": "50",
    "Gains Rate Federal": "80",
    "Gains Rate State": "10",
   
  };

  const [capitalGainData, setCapitalGainData] = useState(
    {
    "Subject To Cap Gains": capitalGainObj && capitalGainObj["Subject To Cap Gains"] || capitalGainObjMain["Subject to Cap Gains"],
        "Gains Rate Federal": capitalGainObj && capitalGainObj["Gains Rate Federal"] || capitalGainObjMain["Gains Rate Federal"],
        "Gains Rate State": capitalGainObj && capitalGainObj["Gains Rate State"] || capitalGainObjMain["Gains Rate State"],
      }
  );

  const { styles } = defaultStyles;


  const handleCapitalGainInfo = (obj) => {
    const { name, value } = obj;

    setCapitalGainData({
      ...capitalGainData,
      [name]: value,
    });
  };


  const nextComponent={
    name: "carryForward",
    title: "Carry Forward",
    unique: "matric",
    isMulti: false,
    component: CarryForward,
    carryForward: {},

  }

  const preComponent = {
    name: "taxCredits",
    title: "Tax Credits",
    unique: "Other Tax Credit",
    isMulti: true,
    component: TaxCredits,
    taxCredits: {},
  }

  const submitData = () => {
    handleTaxInflationObject(capitalGainData)
    nextForm(nextComponent)
  }

  const fields = [
    {
      Component: IconInput,
      value: {
        name: "Subject To Cap Gains",
        title: "Amount Withdrawn Subject To Cap Gains",
        icon:"%",
        value: capitalGainData["Subject To Cap Gains"],
        iconPosition: "end",
        onChange: (event) => handleCapitalGainInfo(event.target),
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Gains Rate Federal",
        title: "Cap Gains Rate Federal",
        icon:"%",
        value: capitalGainData["Gains Rate Federal"],
        iconPosition: "end",
        onChange: (event) => handleCapitalGainInfo(event.target),
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Gains Rate State",
        title: "Cap Gains Rate State",
        icon:"%",
        value: capitalGainData["Gains Rate State"],
        iconPosition: "end",
        onChange: (event) => handleCapitalGainInfo(event.target),
      },
    },
  ];

  return (
    <Style.MainContainer>
      <Text style={styles.text.formHeaderText} padding="3rem 0">
        Capital Gains & Carry Forward Loss Information
      </Text>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component } = data;
            return (
              <InputGroup>
                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                  {value.title}
                </Text>

                <Component key={index} value={value} />
              </InputGroup>
            );
          })}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
      <Button 
      onClick={() => preForm(preComponent)}
      >
          Previuos
        </Button>
        <Button onClick={submitData}>
          Next
        </Button>
      </Style.ButtonsContainer>
    </Style.MainContainer>
  );
}

export default CapitalGains;
