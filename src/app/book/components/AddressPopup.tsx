"use client";

import React from "react";
import styles from "../styles/popup.module.css";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setRemarks, setLandmark } from "../../../../redux/booking/bookingSlice";

interface AddressPopupProps {
  setPopup: (value: string) => void;
  setShowDetails: (value: boolean) => void;
}

const AddressPopup: React.FC<AddressPopupProps> = ({ setPopup, setShowDetails }) => {
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.booking.address);
  const remarks = useSelector((state: any) => state.booking.remarks);
  const landmark = useSelector((state: any) => state.booking.landmark);
  const [house, setHouse] = React.useState("");
  const [road, setRoad] = React.useState("");
  const [localLandmark, setLocalLandmark] = React.useState(landmark || "");
  const [localRemarks, setLocalRemarks] = React.useState(remarks || "");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (address) {
      const [h, r] = address.split(",");
      setHouse(h?.trim() || "");
      setRoad(r?.trim() || "");
    }
    setLocalRemarks(remarks || "");
    setLocalLandmark(landmark || "");
  }, [address, remarks, landmark]);

  const handleDone = () => {
    if (!house.trim() || !road.trim()) {
      setError("All required address fields must be filled");
      return;
    }
    let fullAddress = house.trim() + ", " + road.trim();
    if (localLandmark.trim()) fullAddress += ", Landmark: " + localLandmark.trim();
    dispatch(setAddress(fullAddress));
    dispatch(setRemarks(localRemarks.trim()));
    dispatch(setLandmark(localLandmark.trim()));
    setPopup("");
    setShowDetails(true);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Enter Address</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.popupContent}>
        <div style={{ marginBottom: 6, fontWeight: 600, fontSize: 15 }}>House No., Building Name <span style={{color:'#ff4d4f'}}>*</span></div>
        <div style={{ marginBottom: 18, border: '1px solid #e0e0e0', borderRadius: 10, padding: 8, background: '#fff' }}>
          <input
            className={styles.selector}
            style={{ width: '100%', fontSize: 16, border: 'none', boxShadow: 'none', background: 'transparent' }}
            value={house}
            onChange={e => setHouse(e.target.value)}
            placeholder="Flat 101, Green Apartments"
          />
        </div>
        <div style={{ marginBottom: 6, fontWeight: 600, fontSize: 15 }}>Road name, Area, Colony <span style={{color:'#ff4d4f'}}>*</span></div>
        <div style={{ marginBottom: 18, border: '1px solid #e0e0e0', borderRadius: 10, padding: 8, background: '#fff', position: 'relative' }}>
          <input
            className={styles.selector}
            style={{ width: '100%', fontSize: 16, border: 'none', boxShadow: 'none', background: 'transparent', paddingRight: 36 }}
            value={road}
            onChange={e => setRoad(e.target.value)}
            placeholder="MG Road, Indiranagar"
          />
        </div>
        <div style={{ marginBottom: 6, fontWeight: 600, fontSize: 15 }}>Nearby Famous Shop/Mall/Landmark</div>
        <div style={{ marginBottom: 18, border: '1px solid #e0e0e0', borderRadius: 10, padding: 8, background: '#fff' }}>
          <input
            className={styles.selector}
            style={{ width: '100%', fontSize: 16, border: 'none', boxShadow: 'none', background: 'transparent' }}
            value={localLandmark}
            onChange={e => setLocalLandmark(e.target.value)}
            placeholder="Near City Mall"
          />
        </div>
        {error && <div style={{ color: '#ff4d4f', marginBottom: 8 }}>{error}</div>}
        <div style={{ marginBottom: 6, fontWeight: 600, fontSize: 15 }}>Remarks (optional)</div>
        <div style={{ marginBottom: 12, border: '1px solid #e0e0e0', borderRadius: 10, padding: 8, background: '#fff' }}>
          <textarea
            className={styles.selector}
            style={{ minHeight: 40, width: '100%', border: 'none', boxShadow: 'none', background: 'transparent' }}
            value={localRemarks}
            onChange={e => setLocalRemarks(e.target.value)}
            placeholder="Any remarks for the event (optional)"
          />
        </div>
      </div>
      <div className={styles.popupFooter}>
        <button className={styles.doneButton} onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddressPopup; 