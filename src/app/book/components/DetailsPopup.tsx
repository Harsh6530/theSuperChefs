"use client"

import type React from "react"
import styles from "../styles/popup.module.css"
import { X } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface MenuItem {
  _id: string;
  Course_Type: string;
  Classification: string;
  Cuisine: string;
  Dish_Name: string;
  Remarks?: string;
}

interface DetailsPopupProps {
  setPopup: (value: string) => void
  guests: { adults: number; children: number }
  selectedItems: MenuItem[]
  totalAmount: number
  courseCounts: Record<string, number>
  guestsTotal: number
  itemsTotal: number
  BASE_PRICE: number
  city: string
  waiterCount: number
  bartenderCount: number
  waiterTotal: number
  bartenderTotal: number
  coupon: string
  address: string
  remarks: string
  date: string
  time: string
}

const COURSE_PRICES: Record<string, number> = {
  Soups: 149,
  Starters: 299,
  "Main Course": 299,
  Sides: 149,
  Desserts: 299,
  Beverages: 149,
}

const COURSE_LABELS: Record<string, string> = {
  Soups: "Soups",
  Starter: "Starters",
  Starters: "Starters",
  Mains: "Main Course",
  "Main Course": "Main Course",
  Sides: "Sides",
  Desserts: "Desserts",
  Dessert: "Desserts",
  Beverages: "Beverages",
}

const BOOKING_FEE = 199;

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, guests, selectedItems, totalAmount, courseCounts, guestsTotal, itemsTotal, BASE_PRICE, city, waiterCount, bartenderCount, waiterTotal, bartenderTotal, coupon, address, remarks, date, time }) => {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false);

  // Calculate staff total and final total (mirroring page.tsx logic)
  const staffTotal = waiterTotal + bartenderTotal;
  const subtotal = BASE_PRICE + guestsTotal + itemsTotal + staffTotal;
  const COUPON_CODE = "WELCOME15";
  const COUPON_DISCOUNT = 0.15;
  const isCouponApplied = coupon === COUPON_CODE;
  const discountAmount = isCouponApplied ? Math.round(subtotal * COUPON_DISCOUNT) : 0;
  const discountedTotal = isCouponApplied ? subtotal - discountAmount : subtotal;

  const handlePayment = async () => {
    try {
      const credentialsString = localStorage.getItem("Credentials");
      const credentials = credentialsString ? JSON.parse(credentialsString) : {};
      const merchantTransactionId = `MT${Date.now()}`;
      // Build full address with landmark on a new line if present
      let fullAddress = address;
      if (remarks && remarks.toLowerCase().includes("landmark")) {
        // If landmark is in remarks, append it as a new line if not already in address
        if (!address.toLowerCase().includes("landmark")) {
          fullAddress = address + "\n" + remarks;
        }
      }
      // Remove any ref_id or txn_id from orderData
      const orderData = {
        user: credentials.name || "",
        mobile: credentials.mobile || "",
        date,
        time,
        status: "pending",
        members: guests,
        total: isCouponApplied ? discountedTotal : totalAmount,
        items: selectedItems.map((item, idx) => ({
          id: idx + 1,
          name: item.Dish_Name,
          price: COURSE_PRICES[COURSE_LABELS[item.Course_Type] || item.Course_Type] || 0,
          category: COURSE_LABELS[item.Course_Type] || item.Course_Type,
        })),
        txn_id: merchantTransactionId,
        city,
        waiterCount,
        bartenderCount,
        coupon,
        createdAt: new Date().toISOString(),
        address: fullAddress,
        remarks,
      };

      // 1. Save order as pending
      const orderRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!orderRes.ok) {
        throw new Error('Failed to save order');
      }

      // 2. Initiate payment
      const response = await fetch('/api/payrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: BOOKING_FEE * 100, // in paise
          merchantTransactionId,
          orderData, // send the rest of your order data for your own records
        }),
      });

      if (!response.ok) {
        throw new Error('Payment request failed');
      }

      const data = await response.json();
      router.push(data.data.redirectUrl);
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className={`${styles.popup} ${styles.detailsPopup}`}>
      <div className={styles.popupHeader}>
        <h2>Booking Details</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        {/* Event Details - align like bill rows */}
        <div className={styles.detailsSection} style={{marginBottom: 10}}>
          <div className={styles.detailsRow}><span style={{fontWeight: 600, color: '#ff8c1a'}}>Event Details</span></div>
          <div className={styles.detailsRow}><span>City</span><span style={{textAlign:'right'}}>{city}</span></div>
          <div className={styles.detailsRow}><span>Address</span><span style={{textAlign:'right', display:'block', whiteSpace:'pre-line', wordBreak:'break-word', maxWidth: 'min(60vw, 350px)', marginLeft: 'auto'}}>{address.replace(/, Landmark:/gi, '\nLandmark:')}</span></div>
          {coupon && <div className={styles.detailsRow}><span>Coupon</span><span style={{textAlign:'right'}}>{coupon}</span></div>}
          {remarks && <div className={styles.detailsRow}><span>Remarks</span><span style={{textAlign:'right'}}>{remarks}</span></div>}
        </div>
        <div className={styles.detailsSection} style={{marginBottom: 8}}>
          <div className={styles.detailsRow}><span>Base Price</span><span style={{textAlign:'right'}}>₹{BASE_PRICE}</span></div>
        </div>
        {guestsTotal > 0 && (
          <div className={styles.detailsSection} style={{marginBottom: 8}}>
            <div className={styles.detailsRow}><span>Guests Total</span><span style={{textAlign:'right'}}>₹{guestsTotal}</span></div>
          </div>
        )}
        {itemsTotal > 0 && (
          <div className={styles.detailsSection} style={{marginBottom: 8}}>
            <div className={styles.detailsRow}><span>Items Total</span><span style={{textAlign:'right'}}>₹{itemsTotal}</span></div>
          </div>
        )}
        {staffTotal > 0 && (
          <div className={styles.detailsSection} style={{marginBottom: 8}}>
            <div className={styles.detailsRow}><span>Additional Services</span><span style={{textAlign:'right'}}>
              {/* {waiterCount > 0 && `Waiters: ${waiterCount}`} {waiterCount > 0 && bartenderCount > 0 && ', '} {bartenderCount > 0 && `Bartenders: ${bartenderCount}`} */}
              {waiterCount > 0 || bartenderCount > 0 ? '₹' + staffTotal : ''}
            </span></div>
          </div>
        )}
        {/* View Details button at left corner, green, italic */}
        <div style={{textAlign:'left', margin:'12px 0'}}>
          <button style={{background:'#eafaf1', border:'none', color:'#219653', fontStyle:'italic', fontWeight:600, fontSize:11, borderRadius:6, padding:'6px 18px', cursor:'pointer', boxShadow:'0 1px 4px rgba(44,62,80,0.04)'}} onClick={()=>setShowDetails(true)}>
            View Details
          </button>
        </div>
        {/* Grand Total section, no grey container */}
        <div style={{borderTop:'1.5px solid #eee', marginTop: 8, paddingTop: 16}}>
          <div className={styles.totalRow}>
            <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>Total Amount</span>
            {isCouponApplied ? (
              <span>
                <span style={{ textDecoration: "line-through", color: "#888", fontWeight: 400, fontSize: "1.1rem", marginRight: 8 }}>
                  ₹{subtotal}
                </span>
                <span style={{ color: "#ff4d4f", fontWeight: 700, fontSize: 22 }}>₹{discountedTotal}</span>
              </span>
            ) : (
              <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>₹{subtotal}</span>
            )}
          </div>
          {isCouponApplied && (
            <div className={styles.totalRow} style={{ color: '#ff9800', fontWeight: 700, fontSize: 15, marginTop: 4, marginBottom: 10, textAlign: 'right'}}>
              You save ₹{discountAmount} with coupon!
            </div>
          )}
          <div style={{ 
            color: '#219653',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#eafaf1',
            borderRadius: '4px',
            border: '1px solid #b7eacb'
          }}>
            The booking fee of ₹{BOOKING_FEE} will be deducted from your final bill
          </div>
        </div>
        {/* Details Modal */}
        {showDetails && (
          <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.25)', zIndex:10000, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{background:'#fff', borderRadius:12, boxShadow:'0 4px 24px rgba(0,0,0,0.15)', padding:32, minWidth:520, maxWidth:700, position:'relative', maxHeight:'80vh', overflow:'auto'}}>
              <button style={{position:'absolute', top:12, right:12, background:'none', border:'none', fontSize:22, cursor:'pointer'}} onClick={()=>setShowDetails(false)}>&times;</button>
              <h3 style={{color:'#219653', fontWeight:700, fontSize:22, marginBottom:18, textAlign:'center', letterSpacing:1}}>Detailed Bill</h3>
              {/* Bill-style breakdown, right-aligned amounts, headings colored, broader popup, only show non-zero sections */}
              {BASE_PRICE > 0 && (
                <div style={{marginBottom:10}}>
                  <div style={{fontWeight:600, color:'#ff8c1a', marginBottom:4}}>Base Price</div>
                  <div className={styles.detailsRow}><span>Base Price</span><span style={{textAlign:'right'}}><b>₹{BASE_PRICE}</b></span></div>
                </div>
              )}
              {guestsTotal > 0 && (
                <div style={{marginBottom:10}}>
                  <div style={{fontWeight:600, color:'#ff8c1a', marginBottom:4}}>Guests</div>
                  {guests.adults > 0 && <div className={styles.detailsRow}><span>Adults</span><span style={{textAlign:'right'}}>{guests.adults} * ₹100 = ₹{guests.adults * 100}</span></div>}
                  {guests.children > 0 && <div className={styles.detailsRow}><span>Children</span><span style={{textAlign:'right'}}>{guests.children} * ₹75 = ₹{guests.children * 75}</span></div>}
                  <div className={styles.detailsRow}><span style={{fontWeight:600}}>Total</span><span style={{textAlign:'right'}}><b>₹{guestsTotal}</b></span></div>
                </div>
              )}
              {itemsTotal > 0 && (
                <div style={{marginBottom:10}}>
                  <div style={{fontWeight:600, color:'#ff8c1a', marginBottom:4}}>Items</div>
                  {selectedItems.length > 0 && selectedItems.map((item, idx) => {
                    const price = COURSE_PRICES[COURSE_LABELS[item.Course_Type] || item.Course_Type] || 0;
                    if (price === 0) return null;
                    return (
                      <div className={styles.detailsRow} key={item._id || idx}>
                        <span>{item.Dish_Name}</span>
                        <span style={{textAlign:'right'}}>1 * ₹{price} = ₹{price}</span>
                      </div>
                    );
                  })}
                  <div className={styles.detailsRow}><span style={{fontWeight:600}}>Total</span><span style={{textAlign:'right'}}><b>₹{itemsTotal}</b></span></div>
                </div>
              )}
              {staffTotal > 0 && (
                <div style={{marginBottom:10}}>
                  <div style={{fontWeight:600, color:'#ff8c1a', marginBottom:4}}>Additional Services</div>
                  {waiterCount > 0 && <div className={styles.detailsRow}><span>Waiters</span><span style={{textAlign:'right'}}>{waiterCount} * ₹1500 = ₹{waiterCount * 1500}</span></div>}
                  {bartenderCount > 0 && <div className={styles.detailsRow}><span>Bartenders</span><span style={{textAlign:'right'}}>{bartenderCount} * ₹2000 = ₹{bartenderCount * 2000}</span></div>}
                  <div className={styles.detailsRow}><span style={{fontWeight:600}}>Total</span><span style={{textAlign:'right'}}><b>₹{staffTotal}</b></span></div>
                </div>
              )}
              <div style={{borderTop:'1.5px solid #eee', marginTop:18, paddingTop:12}}>
                <div className={styles.detailsRow}>
                  <span style={{fontWeight:700, fontSize:18, color:'#111'}}>Grand Total</span>
                  <span style={{fontWeight:700, fontSize:18, color:'#111', textAlign:'right'}}>₹{isCouponApplied ? discountedTotal : subtotal}</span>
                </div>
                {isCouponApplied && <div style={{color:'#ff9800', fontWeight:600, fontSize:14, marginTop:4, textAlign:'right'}}>You save ₹{discountAmount} with coupon!</div>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.popupFooter}>
        <button className={styles.payButton} onClick={handlePayment}>Pay ₹{BOOKING_FEE} for Booking</button>
      </div>
    </div>
  )
}

export default DetailsPopup
