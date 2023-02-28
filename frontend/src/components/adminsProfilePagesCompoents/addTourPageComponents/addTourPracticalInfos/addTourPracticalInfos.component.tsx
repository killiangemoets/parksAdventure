import { useState } from "react";
import { idText } from "typescript";
import Button from "../../../UIComponents/button/button.component";
import { INFO_ICON_TYPE_CLASSES } from "../../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import QuickFactInput, {
  handleChangeValueType,
  QUICK_FACT_INPUT_TYPE,
} from "../quickFactInput/quickFactInput.component";
import {
  AdditionalInfoExtraInputs,
  AdditionalInfoInputs,
  AddTourPracticalInfosContainer,
  AddTourPracticalInfosContent,
  AddTourPracticalInfosTitle,
  AddTourPracticalInfosWrapper,
} from "./addTourPracticalInfos.style";

const AddTourPracticalInfos = () => {
  const [address, setAddress] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string[]>([]);
  const handleChangeAddress = (value: handleChangeValueType) => {
    setAddress(value as string);
  };
  const handleChangeAdditionalInfo = (
    value: handleChangeValueType,
    name: string
  ) => {
    const infoNumber = +name.split("additionalInfo")[1] - 1;
    console.log(infoNumber);
    let newAdditionalInfoArray = [...additionalInfo];
    newAdditionalInfoArray[infoNumber] = value as string;
    newAdditionalInfoArray = newAdditionalInfoArray.filter(
      (info) => info.length > 0
    );
    setAdditionalInfo(newAdditionalInfoArray);
  };

  return (
    <AddTourPracticalInfosContainer>
      <AddTourPracticalInfosWrapper>
        <AddTourPracticalInfosTitle>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            Practical Information
          </Title>
        </AddTourPracticalInfosTitle>
        <AddTourPracticalInfosContent>
          <QuickFactInput
            type={QUICK_FACT_INPUT_TYPE.text}
            iconType={INFO_ICON_TYPE_CLASSES.location}
            handleChange={handleChangeAddress}
            infoName="Address"
            name="address"
            value={address}
            placeholder="Add an address"
          />
          <AdditionalInfoInputs>
            <QuickFactInput
              type={QUICK_FACT_INPUT_TYPE.text}
              iconType={INFO_ICON_TYPE_CLASSES.list}
              handleChange={handleChangeAdditionalInfo}
              infoName="Additional Information"
              name={"additionalInfo1"}
              value={additionalInfo[0]}
              placeholder="Add an information"
            />
            <AdditionalInfoExtraInputs>
              {additionalInfo.map((_, i) => {
                const name = "additionalInfo" + (i + 2).toString();
                return (
                  <QuickFactInput
                    type={QUICK_FACT_INPUT_TYPE.text}
                    handleChange={handleChangeAdditionalInfo}
                    infoName=""
                    name={name}
                    value={additionalInfo[i + 1]}
                    placeholder="Add an information"
                  />
                );
              })}
            </AdditionalInfoExtraInputs>
          </AdditionalInfoInputs>
        </AddTourPracticalInfosContent>
      </AddTourPracticalInfosWrapper>
    </AddTourPracticalInfosContainer>
  );
};

export default AddTourPracticalInfos;
