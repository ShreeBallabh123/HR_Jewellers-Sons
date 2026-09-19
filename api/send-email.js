/* global process */
// Node.js Vercel Serverless Function to securely dispatch transactional email notifications.
// Uses a zero-dependency fetch call to the Resend API to protect credentials from the client side.

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, recipient, data } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined in environment variables. Email mock triggered.");
    return res.status(200).json({
      success: true,
      mock: true,
      message: "Resend key missing; simulated dispatch completed successfully."
    });
  }

  let subject;
  let html;

  if (type === 'new_order') {
    subject = `Official Tax Invoice & Order Confirmation #${data.orderId} - HR Jewellers & Sons`;
    const subtotal = data.subtotal || Math.round(data.total / 1.03);
    const gstAmount = data.gst || Math.round(data.total - subtotal);
    const itemsList = Array.isArray(data.items) ? data.items : [];

    html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: auto; padding: 30px; border: 1px solid #D4AF37; background-color: #0A0A0A; color: #F5E6C4; border-radius: 16px;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px;">
          <h1 style="color: #D4AF37; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: bold; letter-spacing: 0.15em; margin: 0;">HR JEWELLERS & SONS</h1>
          <p style="font-size: 10px; color: #E6C687; letter-spacing: 0.3em; margin: 6px 0 0 0; text-transform: uppercase;">Tradition of Trust Since 1996 · Bikaner, Rajasthan</p>
          <p style="font-size: 11px; color: rgba(255,255,255,0.7); margin: 6px 0 0 0;">
            GSTIN: <strong style="color: #D4AF37;">08AASFH1262R1ZM</strong> | State: 08-Rajasthan | Email: hrjewellerssons@gmail.com
          </p>
        </div>

        <!-- Order Summary Box -->
        <div style="background-color: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; padding: 20px; margin: 25px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">TAX INVOICE / ORDER ID:</span>
            <strong style="color: #D4AF37; font-family: monospace; font-size: 15px; letter-spacing: 0.05em;">#${data.orderId}</strong>
          </div>
          <div style="border-top: 1px solid rgba(212,175,55,0.15); padding-top: 12px; font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.9);">
            <p style="margin: 3px 0;"><strong>Customer Name:</strong> ${data.name || 'Valued Patron'}</p>
            <p style="margin: 3px 0;"><strong>Mobile:</strong> ${data.phone || 'N/A'}</p>
            <p style="margin: 3px 0;"><strong>Delivery / Pickup Destination:</strong> ${data.address || 'Showroom Collection'}</p>
            <p style="margin: 3px 0;"><strong>Payment Mode:</strong> <span style="color: #10B981; font-weight: bold;">${(data.paymentMethod || 'Online / Verified').toUpperCase()}</span></p>
          </div>
        </div>

        <!-- 1-Click Track Button -->
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://hrjewellers.in/?track=${data.orderId}" style="background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%); color: #000; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 28px; border-radius: 10px; display: inline-block; letter-spacing: 0.15em; text-transform: uppercase; box-shadow: 0 4px 15px rgba(212,175,55,0.3);">
            🚚 Track Live Order Status
          </a>
        </div>

        <!-- Items Table -->
        <h3 style="color: #D4AF37; font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 25px 0 10px 0; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 8px;">
          Purchased Jewellery Items
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: rgba(255,255,255,0.9);">
          <thead>
            <tr style="border-bottom: 1px solid #D4AF37; text-align: left; color: #E6C687; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px 4px;">Item Description</th>
              <th style="padding: 8px 4px;">Purity / Weight</th>
              <th style="padding: 8px 4px; text-align: center;">Qty</th>
              <th style="padding: 8px 4px; text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList.map(item => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 10px 4px; font-weight: 600;">${item.name}</td>
                <td style="padding: 10px 4px; color: rgba(255,255,255,0.6);">${item.carat || item.weight || 'BIS 916 Hallmarked'}</td>
                <td style="padding: 10px 4px; text-align: center;">${item.quantity || 1}</td>
                <td style="padding: 10px 4px; text-align: right; color: #D4AF37; font-weight: bold;">₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Tax & Total Calculation -->
        <div style="margin-top: 20px; border-top: 1px solid rgba(212,175,55,0.25); padding-top: 15px; font-size: 13px; line-height: 1.8;">
          <div style="display: flex; justify-content: space-between; color: rgba(255,255,255,0.7);">
            <span>Taxable Subtotal:</span>
            <span>₹${Number(subtotal).toLocaleString('en-IN')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: rgba(255,255,255,0.7);">
            <span>GST (3% Jewelry Tax):</span>
            <span>₹${Number(gstAmount).toLocaleString('en-IN')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: #D4AF37; font-size: 17px; font-weight: bold; margin-top: 8px; border-top: 2px solid #D4AF37; padding-top: 8px;">
            <span>Grand Total:</span>
            <span>₹${Number(data.total).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Footer Notice -->
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 30px 0 15px 0;" />
        <p style="font-size: 11px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.6; margin: 0;">
          All jewellery certified by Bureau of Indian Standards (BIS Hallmarked).<br/>
          For customer support or custom modifications, call/WhatsApp: <strong style="color: #D4AF37;">+91 97838 43978</strong>
        </p>
      </div>
    `;
  } else if (type === 'consultation') {
    subject = `New Boutique Fitting Lounge Booking - HR Jewellers & Sons`;
    html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #D4AF37; background-color: #0B0605; color: #F5E6C4;">
        <h2 style="color: #D4AF37; font-family: serif; font-weight: normal; letter-spacing: 0.15em; text-align: center;">HR JEWELLERS & SONS</h2>
        <p style="text-align: center; font-size: 10px; color: #D4AF37; letter-spacing: 0.25em;">OM SHANTI · BIKANERI TRADITIONAL ARTISTRY</p>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.35); margin: 20px 0;" />
        <h3 style="color: #fff; font-family: serif; font-weight: normal;">Bespoke Lounge Appointment Reserved</h3>
        <p style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;">We are delighted to confirm your private showroom consultation request:</p>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,85,0.15); padding: 15px; border-radius: 12px; margin: 15px 0; font-size: 12px; line-height: 1.8;">
          <p style="margin: 3px 0;"><strong>Patron Name:</strong> ${data.name}</p>
          <p style="margin: 3px 0;"><strong>Phone Number:</strong> ${data.phone}</p>
          <p style="margin: 3px 0;"><strong>Email Address:</strong> ${data.email || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>Preferred Date:</strong> ${data.date}</p>
          <p style="margin: 3px 0;"><strong>Preferred Time Slot:</strong> ${data.time}</p>
          <p style="margin: 3px 0;"><strong>Inquiry Specialty:</strong> <span style="color: #D4AF37; font-weight: bold;">${data.requestType}</span></p>
          ${data.notes ? `<p style="margin: 3px 0;"><strong>Patron Notes:</strong> ${data.notes}</p>` : ''}
        </div>

        <p style="font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.6; text-align: center; margin-top: 20px;">
          Please present this confirmation when you arrive at Tilak Nagar showroom workshop.
        </p>

        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 30px 0 15px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 0.1em; line-height: 1.5;">
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1996
        </p>
      </div>
    `;
  } else if (type === 'gold_saving_scheme') {
    subject = `New 11+1 Gold Saving Scheme Application - HR Jewellers & Sons`;
    html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #D4AF37; background-color: #0B0605; color: #F5E6C4;">
        <h2 style="color: #D4AF37; font-family: serif; font-weight: normal; letter-spacing: 0.15em; text-align: center;">HR JEWELLERS & SONS</h2>
        <p style="text-align: center; font-size: 10px; color: #D4AF37; letter-spacing: 0.25em;">11+1 GOLD SAVING PLAN REGISTRATION</p>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.35); margin: 20px 0;" />
        <h3 style="color: #fff; font-family: serif; font-weight: normal;">New GRP Enrollment Application</h3>
        <p style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;">We have received a new premium scheme application. Details are below:</p>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,85,0.15); padding: 15px; border-radius: 12px; margin: 15px 0; font-size: 12px; line-height: 1.8;">
          <p style="margin: 3px 0;"><strong>Patron Name:</strong> ${data.name}</p>
          <p style="margin: 3px 0;"><strong>Mobile Number:</strong> ${data.phone}</p>
          <p style="margin: 3px 0;"><strong>Email Address:</strong> ${data.email || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>City:</strong> ${data.city || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>Aadhaar Number:</strong> ${data.aadhaar || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>Monthly Amount:</strong> <span style="color: #D4AF37; font-weight: bold;">₹${data.amount?.toLocaleString('en-IN') || '0'}</span></p>
          <p style="margin: 3px 0;"><strong>11 Months Paid:</strong> ₹${(data.amount * 11)?.toLocaleString('en-IN') || '0'}</p>
          <p style="margin: 3px 0;"><strong>GRP Bonus (Month 12):</strong> ₹${data.amount?.toLocaleString('en-IN') || '0'}</p>
          <p style="margin: 3px 0;"><strong>Total Mature Value:</strong> <span style="color: #4cd137; font-weight: bold;">₹${(data.amount * 12)?.toLocaleString('en-IN') || '0'}</span></p>
          <p style="margin: 3px 0;"><strong>Preferred Showroom Branch:</strong> ${data.branch || 'Tilak Nagar'}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 30px 0 15px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 0.1em; line-height: 1.5;">
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1996
        </p>
      </div>
    `;
  } else if (type === 'custom_design_request') {
    subject = `New Custom Ornaments Design Request - HR Jewellers & Sons`;
    html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #D4AF37; background-color: #0B0605; color: #F5E6C4;">
        <h2 style="color: #D4AF37; font-family: serif; font-weight: normal; letter-spacing: 0.15em; text-align: center;">HR JEWELLERS & SONS</h2>
        <p style="text-align: center; font-size: 10px; color: #D4AF37; letter-spacing: 0.25em;">BESPOKE ATELIER CONCIERGE</p>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.35); margin: 20px 0;" />
        <h3 style="color: #fff; font-family: serif; font-weight: normal;">Bespoke Handcrafted Design Lead</h3>
        <p style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;">A patron has submitted a new custom jewelry design request. Specifications are logged below:</p>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,85,0.15); padding: 15px; border-radius: 12px; margin: 15px 0; font-size: 12px; line-height: 1.8;">
          <p style="margin: 3px 0;"><strong>Patron Name:</strong> ${data.name}</p>
          <p style="margin: 3px 0;"><strong>Mobile Number:</strong> ${data.phone}</p>
          <p style="margin: 3px 0;"><strong>Email Address:</strong> ${data.email || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>City:</strong> ${data.city || 'N/A'}</p>
          <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.05); margin: 10px 0;" />
          <p style="margin: 3px 0;"><strong>Jewelry Type Requested:</strong> ${data.jewelryType || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>Material Preference:</strong> ${data.material || 'N/A'}</p>
          <p style="margin: 3px 0;"><strong>Budget Framework:</strong> <span style="color: #D4AF37; font-weight: bold;">${data.budget || 'N/A'}</span></p>
          <p style="margin: 3px 0;"><strong>Custom Requirements:</strong> ${data.description || 'No description provided'}</p>
          ${data.fileName ? `<p style="margin: 3px 0;"><strong>Uploaded Document/Sketch:</strong> ${data.fileName}</p>` : ''}
        </div>

        ${data.fileData ? `
          <div style="margin: 20px 0; text-align: center;">
            <p style="font-size: 11px; color: #D4AF37; margin-bottom: 8px;">Uploaded Sketch Reference Preview:</p>
            <img src="${data.fileData}" style="max-width: 100%; border: 1px solid #D4AF37; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);" alt="Custom design sketch" />
          </div>
        ` : ''}

        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 30px 0 15px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 0.1em; line-height: 1.5;">
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1996
        </p>
      </div>
    `;
  } else if (type === 'password_reset') {
    subject = `Reset Your Vault Password - HR Jewellers & Sons`;
    html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #D4AF37; background-color: #0B0605; color: #F5E6C4; border-radius: 16px;">
        <h2 style="color: #D4AF37; font-family: serif; font-weight: normal; letter-spacing: 0.15em; text-align: center; margin: 0 0 5px 0;">HR JEWELLERS & SONS</h2>
        <p style="text-align: center; font-size: 10px; color: #D4AF37; letter-spacing: 0.25em; margin: 0;">ESTABLISHED 1952 · BIKANER</p>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.35); margin: 20px 0;" />
        <h3 style="color: #fff; font-family: serif; font-weight: normal; font-size: 18px; margin-bottom: 10px;">Administrator Vault Password Reset</h3>
        <p style="font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6;">
          A password reset request was initiated for your administrator account: <strong style="color: #D4AF37;">${data.email || recipient}</strong>.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetLink}" style="background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%); color: #000; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 32px; border-radius: 12px; display: inline-block; letter-spacing: 0.05em;">
            Reset Password Now
          </a>
        </div>
        <p style="font-size: 11px; color: rgba(255,255,255,0.5); line-height: 1.6;">
          Or copy and paste this link in your browser:<br/>
          <span style="color: #D4AF37; word-break: break-all;">${data.resetLink}</span>
        </p>
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,85,0.15); padding: 12px; border-radius: 8px; margin: 20px 0; font-size: 11px; color: rgba(255,255,255,0.6);">
          ⚠️ <strong>Security Notice:</strong> This reset link is valid for 1 hour. If you did not request this change, please ignore this email or notify your system administrator.
        </div>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 25px 0 15px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 0.1em;">
          HR Jewellers & Sons · Station Road, Kote Gate, Bikaner, Rajasthan 344001
        </p>
      </div>
    `;
  } else {
    subject = `New Transactional Notification - HR Jewellers & Sons`;
    html = `<h3>New Activity Recorded</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'HR Jewellers <notifications@resend.dev>',
        to: [recipient || 'hrjewellerssons@gmail.com'],
        subject: subject,
        html: html
      })
    });

    const resData = await response.json();
    return res.status(200).json({ success: true, data: resData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
