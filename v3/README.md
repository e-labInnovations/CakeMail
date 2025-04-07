# 🎂 CakeMail v3

An advanced version of CakeMail that leverages Google Contacts for birthday management, with email tracking and WhatsApp notifications.

---

## ✨ Features

- Uses Google Contacts as the data source
- Sends beautiful, responsive HTML birthday emails with:
  - Custom branding and logo
  - Animated birthday cake images
  - Personalized greeting with recipient's name
  - Social media links
  - Contact information
  - Email tracking pixel
- Tracks email opens using a tracking pixel
- Sends WhatsApp notifications (via whatabot.net) for:
  - Birthday wishes sent
  - Email opens
  - Upcoming birthdays (next day)
- Sends personalized birthday emails at midnight (12AM–1AM)
- Stores tracking information in contact notes

---

## 📁 What You Need

### 1. Google Contacts Setup

Add contacts with:

- Full name
- Email address
- Birthday date
- (Optional) Phone number
- (Optional) Notes for tracking

### 2. Email Templates

Two beautiful, responsive HTML templates:

1. `template.html`:

   - Modern design with gradient background
   - Animated cupcake images
   - Social media integration
   - Contact section

2. `template2.html`:
   - Classic design with birthday cake
   - Elegant typography
   - Clean layout
   - Contact information

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
   - `template.html` - Modern template
   - `template2.html` - Classic template

### Step 2: Configure the Script

Add the following configuration:

```js
const CONFIG = {
  WHATSAPP_API_KEY: "", // Your WhatsApp API key
  WHATSAPP_PHONE_NUMBER: "", // Your notification number
  SCRIPT_ID: "", // Your script's deployment ID
};
```

### Step 3: Set Up Email Tracking

1. Deploy as web app for tracking
2. Set up `doGet` function
3. Add tracking pixel to templates

### Step 4: Set Up Triggers

1. In Apps Script Editor:
   - Go to **Triggers** (⏰ icon)
   - Create trigger for `sendBdayWishes`
   - Set to run daily (12am to 1am)
   - Create trigger for `sendWhatsappAlert`
   - Set to run daily (9pm to 10pm)

### Step 5: Done! 🎉

The script will now:

- Check for birthdays daily
- Send beautiful HTML emails
- Track email opens
- Send WhatsApp notifications

---

## 🧠 How It Works

1. **Birthday Check**:

   - Checks Google Contacts for birthdays
   - Filters contacts with email addresses

2. **Email Sending**:

   - Uses chosen HTML template
   - Personalizes content
   - Adds tracking pixel

3. **Tracking**:

   - Records email opens
   - Updates contact notes
   - Sends WhatsApp notification

4. **WhatsApp Alerts**:
   - Notifies about sent wishes
   - Alerts about email opens
   - Reminds of upcoming birthdays

---

## 🔐 Permissions

The script needs access to:

- Google Contacts
- Gmail for sending emails
- Deploy as web app (for tracking)
- WhatsApp API access

---

## 🧪 Sample Output

> **Email Subject**: 🎂 Happy Birthday [Name]  
> **Email Body**: A beautiful HTML email with:
>
> - Personalized greeting
> - Birthday message
> - Animated images
> - Contact information
> - Social media links

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
- [v4](../v4/README.md) - Latest version with People API
