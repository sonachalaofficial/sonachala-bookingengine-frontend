import React from "react";

const tiers = [
  {
    name: "SILVER",
    cardGradient: "linear-gradient(135deg, #9ca3af, #4b5563)",
    welcomeRewards: "100 SCPs",
    instantRewards: "1% of the booking value",
    tierRewards: "3% of the booking value",
    freeNights: "8th room night free (once/enrollment year)",
    freeCancellation: "As per the booking rate plan",
    freeEarlyCheckIn: "Not available",
    freeLateCheckOut: "Not available",
    freeRoomUpgrades: "1",
    eligibility: "On completing 2 bookings and stays for a total of 4 nights in a year.",
    upgrade: "Unlock Gold with 4 bookings and a total stay of 8 nights in the membership year.",
    maintain: "Keep the shine on your status with a minimum of 2 bookings and a total of 4 nights stay in the membership year!",
  },
  {
    name: "GOLD",
    cardGradient: "linear-gradient(135deg, #fbbf24, #b45309)",
    welcomeRewards: "200 SCPs",
    instantRewards: "1% of the booking value",
    tierRewards: "3.5% of the booking value",
    freeNights: "10th room night free (once/enrollment year)",
    freeCancellation: "As per the booking rate plan",
    freeEarlyCheckIn: "2",
    freeLateCheckOut: "2",
    freeRoomUpgrades: "3",
    eligibility: "On completing 4 bookings and stays for a total of 8 nights in a year.",
    upgrade: "Unlock Platinum with 8 bookings and a total stay of 16 nights in the membership year.",
    maintain: "Keep the shine on your status with a minimum of 4 bookings and a total of 8 nights stay in the membership year!",
  },
  {
    name: "PLATINUM",
    cardGradient: "linear-gradient(135deg, #1f2937, #000000)",
    welcomeRewards: "300 SCPs",
    instantRewards: "1% of the booking value",
    tierRewards: "4% of the booking value",
    freeNights: "Every 15th room night free",
    freeCancellation: "Until 12 PM of check-in",
    freeEarlyCheckIn: "12 (one per month)",
    freeLateCheckOut: "12 (one per month)",
    freeRoomUpgrades: "12 (one per month)",
    eligibility: "On completing 8 bookings and stays for a total of 16 nights in a year.",
    upgrade: "Keep the shine on your status with a minimum of 8 bookings and a total of 16 nights stay in the membership year!",
    maintain: "Keep the shine on your status with a minimum of 8 bookings and a total of 16 nights stay in the membership year!",
  },
];

const SonachalaRewards = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ fontSize: "2rem", color: "#1a1a1a" }}>
          Get To Know Your Rewards
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Welcome to Sonachala  Rewards (SCR) — where every stay brings you closer to
          exceptional perks! With each booking, you'll unlock exclusive rewards and move up
          the tiers, enjoying even more value with every stay.
        </p>
        <p style={{ textAlign: "center" }}>
 <strong style={{ fontSize: "1.8rem", color: "#0F8B5F", letterSpacing: "0.05em" }}>
    FOR STAY
  </strong>
</p>
        
      </div>

      <div className="row g-4">
        {tiers.map((tier, index) => (
          <div className="col-12 col-md-4" key={index}>
            <div className="h-100 border rounded-3 overflow-hidden shadow-sm">
              {/* Membership Card Visual */}
              <div
                style={{
                  background: tier.cardGradient,
                  color: "#fff",
                  padding: "24px",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="fw-bold" style={{ letterSpacing: "1px" }}>
                  SONACHALA
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <div style={{ fontSize: "0.8rem", opacity: 0.85 }}>
                    Name<br />Contact Number
                  </div>
                  <div className="fw-bold" style={{ fontSize: "1.1rem" }}>
                    {tier.name}
                  </div>
                </div>
              </div>

              <div className="p-3">
                <h5 className="fw-bold text-center mb-1">{tier.name} MEMBERS</h5>
                <p className="text-muted small text-center mb-3">Membership period - 12 months</p>

                <div className="small">
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Welcome Rewards</span>
                    <span className="text-success fw-semibold">{tier.welcomeRewards}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Instant Rewards</span>
                    <span className="text-success">{tier.instantRewards}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Tier Rewards</span>
                    <span className="text-success">{tier.tierRewards}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Free Nights</span>
                    <span className="text-end" style={{ maxWidth: "55%" }}>{tier.freeNights}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold text-muted">Free Cancellation</span>
                    <span className="text-muted text-end" style={{ maxWidth: "55%" }}>{tier.freeCancellation}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Free Early Check-in*</span>
                    <span>{tier.freeEarlyCheckIn}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="fw-semibold">Free Late Check-out*</span>
                    <span>{tier.freeLateCheckOut}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 mb-3">
                    <span className="fw-semibold">Free Room Upgrades*</span>
                    <span>{tier.freeRoomUpgrades}</span>
                  </div>
                </div>

                <p className="text-center text-muted small mb-3">
                  Exclusive & Dedicated Help Desk
                </p>
                <p className="text-muted" style={{ fontSize: "0.7rem" }}>
                  *Subject to availability, booking during non-blackout dates, and other terms & conditions apply.
                </p>

                <div className="small mt-3">
                  <p className="mb-2">
                    <strong>Eligibility</strong><br />
                    {tier.eligibility}
                  </p>
                  <p className="mb-2">
                    <strong>How to Upgrade?</strong><br />
                    {tier.upgrade}
                  </p>
                  <p className="mb-0">
                    <strong>How to Maintain?</strong><br />
                    {tier.maintain}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SonachalaRewards;