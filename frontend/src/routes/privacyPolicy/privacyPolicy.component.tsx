import {
  DotIcon,
  DotIconWrapper,
  PrivacyPolicyBulletPoint,
  PrivacyPolicyContainer,
  PrivacyPolicyContent,
  PrivacyPolicySection,
  PrivacyPolicySectionTitle,
  PrivacyPolicyText,
} from "./privacyPolicy.style";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";

const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Privacy Policy</Title>

      <PrivacyPolicyContent>
        <PrivacyPolicySection>
          <PrivacyPolicyText>
            This Privacy Policy is designed to help you understand how we
            collect, use, disclose, and safeguard your personal information when
            you use our web application to book hiking tours in national parks
            around the world. Please take a moment to read this policy
            carefully.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            1. Information We Collect
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            When you create an account on our platform, we collect certain
            information that can be used to identify you personally. This
            includes:
          </PrivacyPolicyText>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Personal Information:</span> Your full name, email address,
              password, and other relevant contact details.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>User Profile:</span> Information you choose to provide in
              your user profile, such as your profile picture, birth date, and
              other preferences.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Booking Information:</span> Details about the hiking tours
              you book, including tour dates, locations, and any special
              requests.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>

            <PrivacyPolicyText>
              <span>Payment Information:</span> If you make a booking, we
              collect payment details, including credit card information, to
              process your payment securely.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            2. How We Use Your Information
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We use the information we collect for various purposes, including
            but not limited to:
          </PrivacyPolicyText>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Account Creation:</span> To create and manage your account,
              allowing you to access and use our booking services.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Booking Management:</span> To facilitate your booking of
              hiking tours, communicate tour details, and manage your
              reservations.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Improvements:</span> To enhance and personalize your
              experience on our platform, and to develop new features and
              services based on user feedback.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Security:</span> To protect our platform and users from
              fraudulent or unauthorized activities.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            3. Confidentiality and Data Security
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We are committed to ensuring the security and confidentiality of
            your personal information. We take appropriate technical and
            organizational measures to protect your data from unauthorized
            access, loss, or alteration. However, it's important to note that no
            method of data transmission over the internet is completely secure,
            and we cannot guarantee absolute security.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            4. Disclosure of Your Information
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We may disclose your personal information to:
          </PrivacyPolicyText>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Tour Guides and Partners:</span> In order to facilitate your
              booked tours and provide you with the best experience, we share
              relevant booking details with our tour guides and partners.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span> Legal Requirements:</span> If required by law or in
              response to a legal request, we may disclose your information to
              authorities.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>5. Your Choices</PrivacyPolicySectionTitle>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Account Information:</span> You can update or modify your
              account information at any time through your profile settings on
              the platform.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Communication Preferences:</span> You can manage your
              communication preferences by adjusting your notification settings.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              <span>Data Removal:</span> If you wish to delete your account and
              associated data, you can do it through the settings of your
              account. When you choose to delete your account, please note that
              we will retain your transaction history for accounting and legal
              compliance reasons. The rest of your data, including your reviews,
              will be permanently deleted from our systems.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            6. Acceptance of this Policy
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            By creating an account and using our platform, you acknowledge that
            you have read and understood this Confidentiality Policy and agree
            to the collection, use, and disclosure of your personal information
            as described herein.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            7. Changes to the Policy
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We may update this policy from time to time to reflect changes in
            our practices or for legal reasons. Any updates will be posted on
            this page.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicyText>
            If you have any questions, concerns, or feedback regarding this
            Privacy Policy, please contact our support team at
            info@nationalparkshikingtours.com. Your privacy is important to us,
            and we are here to assist you.
          </PrivacyPolicyText>
          <PrivacyPolicyText>
            Thank you for choosing National Parks Hiking Tours for your hiking
            adventure needs!
          </PrivacyPolicyText>
        </PrivacyPolicySection>
      </PrivacyPolicyContent>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
