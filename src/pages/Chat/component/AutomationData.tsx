import React from "react";

interface IAutomationData {
  label: string;
  value: string;
}

interface AutomationDataProps {
  automationData: IAutomationData[];
}

function AutomationData(props: AutomationDataProps) {
  const { automationData } = props;
  return (
    <div>
      <p>
        Would you like to create an automation to start saving up for this trip
        ?
      </p>
      <div className="w-[100%] flex">
        <div
          style={{ backgroundColor: "#dab4ff" }}
          className="w-[10px] rounded-2xl mt-2 mb-2"
        ></div>
        <div className="automation-data">
          {automationData?.map((dataObj) => {
            return (
              <p>
                <p>{dataObj?.label}</p>
                <p>{dataObj?.value}</p>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AutomationData;
