import React from "react";
import styles from "./Footer.module.css";

interface RefundPolicyModalProps {
  onClose: () => void;
}

const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ onClose }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.modalClose} onClick={onClose}>&times;</button>
      <h1 className={styles.modalTitle}>Refund & Cancellation Policy</h1>
      <div className={styles.modalBody} style={{ maxHeight: 500, overflowY: 'auto', paddingRight: 8 }}>
        <h2>The SuperChefs Refund & Cancellation Policy</h2>
        <p>At <b>The SuperChefs</b>, our mission is to deliver unparalleled culinary experiences while ensuring transparency, fairness, and mutual respect between our valued customers and our expert chefs. This comprehensive Refund & Cancellation Policy outlines the terms and procedures for cancellations, refunds, and dispute resolutions related to our services. By using our platform, you agree to the following terms:</p>

        <h3>1. Customer-Initiated Cancellations</h3>
        <h4>(a). Timely Cancellations</h4>
        <ul>
          <li><b>Full Refund Eligibility:</b> If you cancel your booking within the specified cancellation period, you will receive a full refund for your payment. Our chefs will still be credited for any preparation or commitment work completed prior to cancellation, if applicable.</li>
          <li><b>Notification Requirement:</b> Cancellations must be communicated via our platform or customer support channels to be considered valid.</li>
        </ul>

        <h4>(b). Late Cancellations</h4>
        <ul>
          <li><b>Partial Refunds:</b> Cancellations made after the designated cancellation window may result in a partial refund. The refund amount will be adjusted according to the timing of the cancellation relative to the scheduled service.</li>
          <li><b>Non-Refundable Charges:</b> In cases where significant preparation work has been undertaken, certain fees may be retained to cover incurred costs.</li>
        </ul>

        <h4>(c). No-Shows</h4>
        <ul>
          <li><b>Refund Implications:</b> If a customer fails to appear for a scheduled service without providing prior notice, a no-show fee may be charged, and refunds will be processed based on a review of the circumstances.</li>
          <li><b>Rescheduling Option:</b> Customers may request a reschedule in lieu of a cancellation, subject to chef availability and mutual agreement.</li>
        </ul>

        <h3>2. The SuperChefs-Initiated Cancellations</h3>
        <h4>(a). No-Show or Last-Minute Cancellations by SuperChefs</h4>
        <ul>
          <li><b>Customer Protection:</b> Should a SuperChef cancel or fail to attend a confirmed booking without timely notification, the customer is entitled to a full refund.</li>
          <li><b>Penalties and Reviews:</b> In such instances, the SuperChef may face penalties, and repeated cancellations could result in further action, including account suspension or removal from the platform.</li>
        </ul>

        <h4>(b). Rescheduling by SuperChefs</h4>
        <ul>
          <li><b>Advance Notification:</b> The SuperChefs are required to notify customers as early as possible if rescheduling becomes necessary.</li>
          <li><b>Mutual Agreement:</b> The rescheduled service must be agreed upon by both parties, and any changes to pricing or service details will be communicated upfront.</li>
          <li><b>Compensation for Inconvenience:</b> If a reschedule leads to significant inconvenience, additional compensation or adjustments may be considered.</li>
        </ul>

        <h3>3. Refund Process and Payment Adjustments</h3>
        <h4>(a). Initiation of Refunds</h4>
        <ul>
          <li><b>Request Submission:</b> Refund requests must be initiated through our platform or by contacting customer support. Each request will be logged and assigned a case number for tracking.</li>
          <li><b>Verification:</b> Our team will verify the request against booking details, communication logs, and any supporting evidence provided by the customer or SuperChef.</li>
        </ul>

        <h4>(b). Refund Calculation and Deductions</h4>
        <ul>
          <li><b>Case-by-Case Evaluation:</b> Refund amounts are calculated based on the specific circumstances of the cancellation, including timing, preparation costs, and any incurred expenses.</li>
          <li><b>Deductions from Chef Earnings:</b> In cases where a refund affects a SuperChef's earnings, any necessary deductions will be processed in the subsequent payout cycle, with detailed explanations provided.</li>
          <li><b>Non-Refundable Amounts:</b> Certain service fees or charges that have already been incurred may be non-refundable, as outlined in our booking policies.</li>
        </ul>

        <h4>(c). Processing Timeframes</h4>
        <ul>
          <li><b>Timely Resolution:</b> Once the refund is approved it will take 7-8 business to credit on customer's payment source.</li>
          <li><b>Notification:</b> Customers and SuperChefs will receive updates regarding the status of their refund or adjustment requests throughout the resolution process.</li>
        </ul>

        <h3>4. Dispute Resolution and Fair Assessment</h3>
        <h4>(a). Evidence Submission</h4>
        <ul>
          <li><b>Supporting Documentation:</b> In the event of a refund or cancellation dispute, both customers and SuperChefs are encouraged to submit any relevant evidence, such as photographs, chat logs, or service documentation, to support their claims.</li>
          <li><b>Objective Review:</b> Our dispute resolution team will objectively review the submitted evidence to make a fair and informed decision.</li>
        </ul>

        <h4>(b). Resolution Process</h4>
        <ul>
          <li><b>Mediation:</b> In cases where there is a disagreement between a customer and a SuperChef, our support team will attempt to mediate a resolution that is acceptable to both parties.</li>
          <li><b>Final Decision:</b> If mediation does not resolve the issue, a final decision will be rendered by our dispute resolution panel, based on the terms of this policy and the available evidence.</li>
          <li><b>Appeals:</b> Both parties have the right to appeal the decision if new evidence or circumstances arise.</li>
        </ul>

        <h3>5. Data Sharing and Confidentiality</h3>
        <h4>(a). Information Disclosure</h4>
        <ul>
          <li><b>Internal Use:</b> All data related to cancellations, refunds, and disputes will be used solely for internal review, quality assurance, and compliance purposes.</li>
          <li><b>Third-Party Sharing:</b> In certain cases, we may share relevant information with trusted third parties, such as payment processors, legal advisors, or regulatory authorities, to resolve disputes or comply with legal requirements.</li>
        </ul>

        <h4>(b). Confidentiality Assurance</h4>
        <ul>
          <li><b>Secure Handling:</b> We are committed to ensuring that all personal and transactional data is handled securely and confidentially, in accordance with our privacy policies.</li>
          <li><b>Transparency:</b> Any changes or updates to this policy will be communicated to users through our platform and via direct notifications where applicable.</li>
        </ul>

        <h3>6. Customer & SuperChefs Communication</h3>
        <p>By using <b>The SuperChefs</b> platform, you agree that we, along with our service partners, may contact you via email, phone, or other communication channels for purposes related to your bookings, service updates, and dispute resolutions. You have the option to manage your communication preferences through your account settings.</p>

        <h3>7. Policy Updates and Revisions</h3>
        <h4>(a). Regular Reviews</h4>
        <p>Our Refund & Cancellation Policy is periodically reviewed and updated to reflect evolving business practices, legal requirements, and customer feedback.</p>

        <h4>(b). Notification of Changes</h4>
        <ul>
          <li>Significant changes to the policy will be communicated through our platform and will take effect immediately upon posting.</li>
          <li>Continued use of our services after policy updates constitutes your acceptance of the revised terms.</li>
        </ul>

        <p>At <b>The SuperChefs</b>, we strive to maintain a balanced, transparent, and fair approach to handling refunds and cancellations. Our goal is to ensure that both our customers and our culinary experts can enjoy a stress-free and rewarding experience. If you have any questions, concerns, or need further clarification regarding our Refund & Cancellation Policy, please do not hesitate to contact our <b>SuperChefs Support Team</b>.</p>
      </div>
    </div>
  </div>
);

export default RefundPolicyModal; 