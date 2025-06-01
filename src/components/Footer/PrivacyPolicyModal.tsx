import React from "react";
import styles from "./Footer.module.css";

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.modalClose} onClick={onClose}>&times;</button>
      <h1 className={styles.modalTitle}>Privacy Policy</h1>
      <div className={styles.modalBody} style={{ maxHeight: 500, overflowY: 'auto', paddingRight: 8 }}>
        {/* --- BEGIN PRIVACY POLICY CONTENT --- */}
        <h3>1. Introduction</h3>
        <p>Welcome to The SuperChefs/Swatantra Singh, a platform dedicated to connecting customers with top-tier chefs for a unique and personalized dining experience. Your privacy and security are our top priorities, and we are committed to protecting any personal information you share with us.</p>
        <p>This Privacy Policy explains how The SuperChefs/Swatantra Singh collects, uses, shares, and protects your personal data when you interact with our website, mobile application, or any other services we offer. By using our platform, you agree to the collection and use of your data as described in this policy.</p>
        <h3>2. Information We Collect</h3>
        <h4>(a). Personal Information</h4>
        <ul>
          <li><b>Identity & Profile Data:</b> Name, email address, phone number, date of birth, and gender.</li>
          <li><b>Government Identifiers:</b> Aadhaar details, PAN card, passport, or any other required identification.</li>
          <li><b>Account Information:</b> Usernames, passwords, profile photos, and preferences.</li>
        </ul>
        <h4>(b). Payment & Transaction Data</h4>
        <ul>
          <li><b>Billing Address</b> (for invoicing purposes)</li>
          <li><b>Payment Details</b> (processed via third-party payment gateways, we do not store credit/debit card information)</li>
          <li><b>Transaction History</b> (records of previous bookings and payments)</li>
        </ul>
        <h4>(c). Device & Technical Data</h4>
        <ul>
          <li><b>IP Address</b> (for location tracking and security)</li>
          <li><b>Device Information</b> (model, OS, browser type, and app usage details)</li>
          <li><b>Crash Reports & Logs</b> (to improve app performance and fix bugs)</li>
        </ul>
        <h4>(d). Location Data</h4>
        <ul>
          <li><b>Precise GPS Location</b> (only if you grant permission)</li>
          <li><b>Approximate Location</b> (based on IP address and Wi-Fi)</li>
        </ul>
        <h4>(e). Communication Data</h4>
        <ul>
          <li><b>Chat Conversations</b> (between users and chefs)</li>
          <li><b>Emails & Feedback Forms</b> (to improve customer experience)</li>
          <li><b>Customer Support Logs</b> (for dispute resolution)</li>
        </ul>
        <h4>(f). Marketing & Analytics Data</h4>
        <ul>
          <li><b>User Preferences & Interests</b> (to tailor recommendations)</li>
          <li><b>Click & Usage Patterns</b> (to enhance app usability)</li>
          <li><b>Advertising Data</b> (to offer personalized promotions)</li>
        </ul>
        <h3>3. How We Use Your Information</h3>
        <h4>(a). Service Delivery & Account Management</h4>
        <ul>
          <li>Facilitating chef bookings, meal planning, and order fulfillment</li>
          <li>Creating and maintaining user profiles</li>
          <li>Processing payments and refunds securely</li>
        </ul>
        <h4>(b). Customer Support & Dispute Resolution</h4>
        <ul>
          <li>Responding to inquiries, complaints, and feedback</li>
          <li>Investigating disputes between customers and chefs</li>
          <li>Ensuring a smooth and safe user experience</li>
        </ul>
        <h4>(c). Security & Fraud Prevention</h4>
        <ul>
          <li>Monitoring transactions for suspicious activity</li>
          <li>Protecting user accounts from unauthorized access</li>
          <li>Detecting fraudulent reviews or fake bookings</li>
        </ul>
        <h4>(d). Personalization & Recommendations</h4>
        <ul>
          <li>Suggesting chefs based on preferences and past bookings</li>
          <li>Offering meal suggestions and promotions based on culinary interests</li>
          <li>Sending personalized offers, newsletters, and promotional materials</li>
        </ul>
        <h4>(e). Compliance with Legal & Regulatory Requirements</h4>
        <ul>
          <li>Meeting obligations under applicable laws and regulations</li>
          <li>Assisting law enforcement when legally required</li>
          <li>Enforcing The SuperChefs' Terms & Conditions</li>
        </ul>
        <h3>4. Sharing Your Information</h3>
        <h4>(a). Service Providers & Business Partners</h4>
        <ul>
          <li><b>Payment Processors</b> (Razorpay, PayPal, Stripe) for handling transactions</li>
          <li><b>Marketing Agencies</b> to provide tailored promotional content</li>
          <li><b>Cloud & Hosting Providers</b> to store and manage user data securely</li>
        </ul>
        <h4>(b). Legal & Compliance Authorities</h4>
        <ul>
          <li>To comply with legal obligations or court orders</li>
          <li>To protect against fraudulent activities</li>
          <li>To enforce our Terms & Conditions</li>
        </ul>
        <h4>(c). Business Transfers</h4>
        <p>In the event of a merger, acquisition, or sale, your data may be transferred to a new entity, ensuring continued service.</p>
        <h3>5. Data Protection & Security Measures</h3>
        <ul>
          <li>Encryption (SSL/TLS) to safeguard data transmissions</li>
          <li>Access Controls limiting data access to authorized personnel only</li>
          <li>Regular Security Audits to identify and resolve vulnerabilities</li>
        </ul>
        <p>While we strive to maintain high security, no platform is completely risk-free. Users are advised to use strong passwords and avoid sharing sensitive details over unsecured networks.</p>
        <h3>6. Your Rights & Choices</h3>
        <h4>(a). Access & Update</h4>
        <ul>
          <li>You can review, edit, or delete your profile information anytime.</li>
        </ul>
        <h4>(b). Opt-Out of Marketing Communications</h4>
        <ul>
          <li>Unsubscribe from emails, SMS notifications, and push alerts via settings.</li>
        </ul>
        <h4>(c). Request Data Deletion</h4>
        <ul>
          <li>If you wish to delete your account and associated data, email <b>swatantra.singh@thesuperchefs.com</b>.</li>
        </ul>
        <h4>(d). Manage Cookies & Tracking</h4>
        <ul>
          <li>You can disable cookies via browser settings, though it may impact functionality.</li>
        </ul>
        <h3>7. Data Retention Policy</h3>
        <ul>
          <li>Providing services and managing accounts</li>
          <li>Compliance with legal requirements</li>
          <li>Resolving disputes and preventing fraud</li>
        </ul>
        <p>Once the retention period ends, your data is permanently deleted or anonymized.</p>
        <h3>8. Third-Party Integrations</h3>
        <ul>
          <li>Google & Facebook Login for account authentication</li>
          <li>Analytics Tools (Google Analytics, Hotjar) to monitor user behavior</li>
        </ul>
        <p>We do not control third-party privacy policies, and users are encouraged to review them separately.</p>
        <h3>9. Changes to This Privacy Policy</h3>
        <ul>
          <li>Email Notifications</li>
          <li>In-App Alerts</li>
          <li>Website Announcements</li>
        </ul>
        <p>Continued use of our services after modifications constitutes acceptance of the revised policy.</p>
        <h3>10. Contact Us</h3>
        <ul>
          <li><b>Email:</b> swatantra.singh@thesuperchefs.com</li>
          <li><b>Phone:</b> +91-8081-035-820</li>
        </ul>
        <p><b>Thank you for trusting The SuperChefs/Swatantra Singh - where we make every meal special!</b></p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyModal; 