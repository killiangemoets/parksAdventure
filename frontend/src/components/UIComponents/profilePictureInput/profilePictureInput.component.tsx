import { ConfigProvider, Upload, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../profilePicture/profilePicture.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { UploadOutlined } from "@ant-design/icons";
import { FC } from "react";
import convertToBase64 from "../../../utils/images-treatment/convert-base-64";
import { RcFile } from "antd/es/upload";
import { ProfilePictureContainer } from "./profilePictureInput.style";
import colors from "../../../colors";

type ProfilePictureInputProps = {
  handleDeleteImage: () => void;
  handleUpdateImage: (imageBase64: string) => void;
  image?: string;
};

const ProfilePictureInput: FC<ProfilePictureInputProps> = ({
  image,
  handleDeleteImage,
  handleUpdateImage,
}) => {
  const uploadImage = async (options: any) => {
    const { onSuccess } = options;
    onSuccess("Ok");
  };

  const onChangeImage: UploadProps["onChange"] = async ({
    fileList: newImagesList,
  }) => {
    while (newImagesList.length > 1) {
      newImagesList.shift();
    }

    if (newImagesList.length) {
      const imageBase64 = await convertToBase64(
        newImagesList[0].originFileObj as RcFile
      );
      handleUpdateImage(imageBase64);
    } else handleUpdateImage("");
  };

  return (
    <ProfilePictureContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
        pictureUrl={image}
        handleDelete={handleDeleteImage}
      />
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            DatePicker: {
              colorPrimary: colors.primary,
              colorLink: colors.primary,
              colorLinkHover: colors.primaryDark,
              fontSize: 16,
              colorText: colors.darkGrey,
              colorTextPlaceholder: colors.grey,
              borderRadiusSM: 999,
              colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
              colorBgElevated: colors.background,
            },
          },
        }}>
        <ImgCrop rotationSlider>
          <Upload
            accept="image/*"
            customRequest={uploadImage}
            // listType="picture-card"
            // fileList={[]}
            onChange={onChangeImage}>
            <Button type="button" buttonType={BUTTON_TYPE_CLASSES.empty}>
              <UploadOutlined />
              Upload profile picture
            </Button>
          </Upload>
        </ImgCrop>
      </ConfigProvider>
    </ProfilePictureContainer>
  );
};

export default ProfilePictureInput;
