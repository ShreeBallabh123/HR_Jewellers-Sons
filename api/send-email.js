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
    subject = `New Order Receipt #${data.orderId} - HR Jewellers & Sons`;
    html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #D4AF37; background-color: #0B0605; color: #F5E6C4;">
        <h2 style="color: #D4AF37; font-family: serif; font-weight: normal; letter-spacing: 0.15em; text-align: center;">HR JEWELLERS & SONS</h2>
        <p style="text-align: center; font-size: 10px; color: #D4AF37; letter-spacing: 0.25em;">OM SHANTI · BIKANERI TRADITIONAL ARTISTRY</p>
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.35); margin: 20px 0;" />
        <h3 style="color: #fff; font-family: serif; font-weight: normal;">Patron Order Confirmed</h3>
        <p style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;">Thank you for shopping with us! Here are your order details:</p>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,85,0.15); padding: 15px; border-radius: 12px; margin: 15px 0; font-size: 12px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Order ID:</strong> <span style="color: #D4AF37;">${data.orderId}</span></p>
          <p style="margin: 3px 0;"><strong>Customer Name:</strong> ${data.name}</p>
          <p style="margin: 3px 0;"><strong>Phone:</strong> ${data.phone}</p>
          <p style="margin: 3px 0;"><strong>Delivery Address:</strong> ${data.address}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.85);">
          <thead>
            <tr style="border-bottom: 2px solid #D4AF37; text-align: left;">
              <th style="padding: 10px 5px; color: #D4AF37;">Product</th>
              <th style="padding: 10px 5px; color: #D4AF37;">Weight</th>
              <th style="padding: 10px 5px; text-align: right; color: #D4AF37;">Qty</th>
              <th style="padding: 10px 5px; text-align: right; color: #D4AF37;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 5px; font-weight: bold;">${item.name}</td>
                <td style="padding: 10px 5px; color: rgba(255,255,255,0.5);">${item.weight}</td>
                <td style="padding: 10px 5px; text-align: right;">${item.quantity}</td>
                <td style="padding: 10px 5px; text-align: right; color: #D4AF37; font-weight: bold;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h3 style="text-align: right; color: #D4AF37; margin-top: 25px; font-family: serif; font-size: 18px; font-weight: normal;">
          Total Amount: ₹${data.total.toLocaleString('en-IN')}
        </h3>
        
        <hr style="border: 0; border-top: 1px solid rgba(212, 175, 85, 0.25); margin: 30px 0 15px 0;" />
        <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 0.1em; line-height: 1.5;">
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1924
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
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1924
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
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1924
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
          Om Shanti · HR Jewellers & Sons, Tilak Nagar, Bikaner (Raj.) · Since 1924
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
        to: [recipient || 'notifications@hrjewellers.com'],
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
