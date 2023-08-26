import {
  DotIcon,
  DotIconWrapper,
  PrivacyPolicyBulletPoint,
  PrivacyPolicyContainer,
  PrivacyPolicyContent,
  PrivacyPolicySection,
  PrivacyPolicySectionTitle,
  PrivacyPolicyText,
} from "../privacyPolicy/privacyPolicy.style";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";

const GeneralTermsAndConditions = () => {
  return (
    <PrivacyPolicyContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        General Terms and Conditions
      </Title>

      <PrivacyPolicyContent>
        <PrivacyPolicySection>
          <PrivacyPolicyText>
            Welcome to National Parks Hiking Tours' Booking Platform! We're
            thrilled to provide you with an incredible opportunity to explore
            national parks around the world through our web application. Please
            take a moment to carefully read and understand these General Terms
            and Conditions. By creating an account and using our services, you
            agree to abide by these terms. If you do not agree with these terms,
            please do not use our platform.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            1. Account Creation
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            To access our hiking tours and make bookings, you are required to
            create an account. You must provide accurate, current, and complete
            information during the registration process and keep your account
            information updated.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            2. Booking and Payment
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            When booking a hiking tour, you agree to pay the specified tour
            price along with any additional fees, taxes, or charges as
            indicated. Payment is due at the time of booking. We accept various
            payment methods as specified on our platform.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            3. Tour Itineraries
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            Tour itineraries, including dates, locations, and activities, are
            subject to change due to factors such as weather conditions, safety
            concerns, or unforeseen events. We strive to provide accurate and
            up-to-date information, but we do not guarantee the accuracy or
            completeness of tour descriptions.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            4. Cancellations and Refunds
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            Our cancellation and refund policy is available on our platform and
            is an integral part of these terms. Please review our policy before
            making a booking.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>5. User Conduct</PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            By using our platform, you agree to:
          </PrivacyPolicyText>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              Provide accurate and truthful information.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              Abide by all applicable laws and regulations.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              Treat other users and our staff with respect and courtesy.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
          <PrivacyPolicyBulletPoint>
            <DotIconWrapper>
              <DotIcon />
            </DotIconWrapper>
            <PrivacyPolicyText>
              Refrain from engaging in fraudulent, malicious, or harmful
              activities.
            </PrivacyPolicyText>
          </PrivacyPolicyBulletPoint>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            6. Intellectual Property
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            The content, design, trademarks, and intellectual property on our
            platform are owned by National Parks Hiking Tours and are protected
            by applicable intellectual property laws. You may not reproduce,
            distribute, modify, or create derivative works without our written
            consent.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            7. Privacy and Data
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We value your privacy and handle your personal information in
            accordance with our Privacy Policy. By using our platform, you
            consent to the collection, use, and sharing of your information as
            outlined in the Privacy Policy.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            8. Limitation of Liability
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            To the extent permitted by law, National Parks Hiking Tours shall
            not be liable for any direct, indirect, incidental, consequential,
            or punitive damages arising out of or related to the use of our
            platform or booking of tours.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            9. Indemnification
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            You agree to indemnify and hold National Parks Hiking Tours, its
            affiliates, partners, and employees harmless from any claims,
            damages, liabilities, and expenses arising out of your use of our
            platform or violation of these terms.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            10. Changes to Terms
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We reserve the right to modify these terms at any time. Changes will
            be effective upon posting on our platform. We recommend reviewing
            these terms periodically.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>11. Termination</PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            We reserve the right to suspend or terminate your account and access
            to our platform if you violate these terms or engage in improper
            conduct.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>
            12. Governing Law
          </PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            These terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            laws principles.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
        <PrivacyPolicySection>
          <PrivacyPolicySectionTitle>13. Contact Us</PrivacyPolicySectionTitle>
          <PrivacyPolicyText>
            If you have any questions, concerns, or feedback about these terms,
            please contact us at info@nationalparkshikingtours.com.
          </PrivacyPolicyText>
        </PrivacyPolicySection>
      </PrivacyPolicyContent>
    </PrivacyPolicyContainer>
  );
};

export default GeneralTermsAndConditions;
