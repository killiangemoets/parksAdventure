import { FC } from "react";
import { CREATE_TOUR_DATA } from "../../../../types/tour";
import { INFO_ICON_TYPE_CLASSES } from "../../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import QuickFactInput, {
  HandleChangeValueType,
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

export type AddTourPracticalInfosProps = {
  address: string | undefined;
  additionalInfo: string[];
  handleChange: (value: string | string[], name: string) => void;
  addressError: boolean;
};

const AddTourPracticalInfos: FC<AddTourPracticalInfosProps> = ({
  address,
  additionalInfo,
  handleChange,
  addressError,
}) => {
  const handleChangeAddress = (value: HandleChangeValueType) => {
    handleChange(value as string, CREATE_TOUR_DATA.address);
  };
  const handleChangeAdditionalInfo = (
    value: HandleChangeValueType,
    name: string
  ) => {
    const infoNumber = +name.split("additionalInfo")[1] - 1;
    console.log(infoNumber);
    let newAdditionalInfoArray = [...additionalInfo];
    newAdditionalInfoArray[infoNumber] = value as string;
    newAdditionalInfoArray = newAdditionalInfoArray.filter(
      (info) => info.length > 0
    );
    handleChange(newAdditionalInfoArray, CREATE_TOUR_DATA.additionalInfo);
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
            error={addressError}
          />
          <AdditionalInfoInputs>
            <QuickFactInput
              type={QUICK_FACT_INPUT_TYPE.text}
              iconType={INFO_ICON_TYPE_CLASSES.list}
              handleChange={handleChangeAdditionalInfo}
              infoName="Additional Information"
              name={"additionalInfo1"}
              value={additionalInfo[0]}
              placeholder="Add information (optional)"
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
                    placeholder="Add an information (optional)"
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
