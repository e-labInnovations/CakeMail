# 🎂 CakeMail v3

An advanced version of CakeMail that leverages Google Contacts for birthday management, with email tracking and WhatsApp notifications.

---

## ✨ Features

- Uses Google Contacts as the data source (no more spreadsheets!)
- Sends beautiful, responsive HTML birthday emails with:
  - Custom branding and logo
  - Animated birthday cake images
  - Personalized greeting with recipient's name
  - Social media links
  - Contact information
  - Email tracking pixel
- Tracks email opens using a tracking pixel
- Sends WhatsApp notifications for:
  - Birthday wishes sent
  - Email opens
  - Upcoming birthdays (next day)
- Sends personalized birthday emails at midnight (12AM–1AM)
- Stores tracking information in contact notes

---

## 📁 What You Need

### 1. Google Contacts Setup

- Add contacts with:
  - Full name
  - Email address
  - Birthday date
  - (Optional) Phone number

### 2. HTML Email Templates

Two beautiful, responsive HTML email templates are included:

1. `template.html` - A modern design with:

   - Gradient background
   - Animated cupcake images
   - Social media integration
   - Contact section
   - Unsubscribe link

2. `template2.html` - A classic design with:
   - Elegant typography
   - Birthday cake illustration
   - Clean layout
   - Contact information
   - Social links

Both templates include:

- Mobile-responsive design
- Email client compatibility
- Tracking pixel integration
- Custom branding elements

### 3. WhatsApp Integration

- A WhatsApp API key (from whatabot.net)
- A phone number for receiving notifications

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new script
3. Create three files:
   - `Code.gs` - Main script file
   - `template.html` - Modern email template
   - `template2.html` - Classic email template

### Step 2: Configure the Script

In `Code.gs`, set up the following configuration:

```js
const CONFIG = {
  WHATSAPP_API_KEY: "", // Your WhatsApp API key
  WHATSAPP_PHONE_NUMBER: "", // Your notification phone number
  SCRIPT_ID: "", // Your script's deployment ID
};
```

### Step 3: Set Up Email Tracking

The script includes a tracking mechanism that works via:

1. A tracking pixel in the email templates
2. A `doGet` function that records when emails are opened
3. Updates contact notes with viewing timestamps

### Step 4: Set Up Triggers

- In the Apps Script Editor:
  - Go to **Triggers** (⏰ icon on left)
  - Create two triggers:
    1. `sendBdayWishes` - Time-driven → Day timer → 12am to 1am
    2. `sendWhatsappAlert` - Time-driven → Day timer → 10am to 11am

### Step 5: Deploy as Web App

- Deploy the script as a web app to enable email tracking
- Set access to "Anyone, even anonymous"
- Copy the deployment URL for the `SCRIPT_ID` in your config

### Step 6: Done! 🎉

Once setup, CakeMail v3 will:

- Check daily at midnight for any birthdays
- Send beautiful HTML birthday emails using either template
- Track when emails are opened
- Send WhatsApp notifications for:
  - Birthday wishes sent
  - Email opens
  - Upcoming birthdays (next day)

---

## 🧠 How It Works

1. **Birthday Check**: The script runs daily at midnight
2. **Email Sending**:
   - For each birthday match in Google Contacts, it creates a personalized HTML email
   - Uses either template with the recipient's name
   - Includes a tracking pixel
3. **Tracking**:
   - When the email is opened, the tracking pixel triggers
   - The `doGet` function records the view
   - Updates contact notes with viewing timestamp
4. **WhatsApp Notifications**:
   - Sends alerts when birthday wishes are sent
   - Notifies when emails are opened
   - Alerts about upcoming birthdays (next day)

---

## 🔐 Permissions

The script requires the following permissions:

- Access to Google Contacts
- Send email on your behalf
- Deploy as a web app (for tracking)
- Access to WhatsApp API

---

## 🧪 Sample Output

> **Email Subject**: 🎂 Happy Birthday [Name]  
> **Email Body**: A beautiful HTML email with:
>
> - Personalized greeting
> - Birthday message
> - Animated cake images
> - Contact information
> - Social media links
> - Tracking pixel

> **WhatsApp Notifications**:
>
> - "Birthday wish sent to [Name]"
> - "[Name] has viewed the mail"
> - "[Name] has birthday tomorrow"

---

## 💬 Credits

Created by [Mohammed Ashad](https://github.com/e-labinnovations)  
Part of the **CakeMail** project!

---

## 🔄 Version History

- [v1](../v1/README.md) - Original version with Google Sheets and Doc templates
- [v2](../v2/README.md) - Enhanced version with HTML templates and tracking
- ✅ v3 - Current version with Google Contacts and WhatsApp integration
- [v4](../v4/README.md) - Latest version
