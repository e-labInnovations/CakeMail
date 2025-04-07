# 🎂 CakeMail v2

An enhanced version of CakeMail that automatically sends beautiful HTML birthday emails using Google Apps Script, with email tracking capabilities.

---

## ✨ Features

- Reads birthday data from a Google Sheet
- Sends beautiful HTML birthday emails with tracking
- Tracks email opens using a tracking pixel
- Sends personalized birthday emails at midnight (12AM–1AM)
- Updates status in the sheet with tracking information

---

## 📁 What You Need

### 1. Google Sheet Setup

[📋 Sample Sheet](https://docs.google.com/spreadsheets/d/1CjCzzu-bKQw4tVEWIVJycJeNhwYwbQVr1ZmICNRUB1o/edit?gid=538178223#gid=538178223)

Required columns:

- Timestamp
- Name
- Mail ID
- Birthday
- Mobile NO (optional)
- Status

### 2. Email Template

The template (`template.html`) includes:

- Custom branding and logo
- Birthday message
- Contact information
- Email tracking pixel
- Mobile-responsive design

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new script
3. Create two files:
   - `Code.gs` - Main script file
   - `template.html` - Email template

### Step 2: Configure the Script

Replace the following in the script:

```js
const ss = SpreadsheetApp.openById("<spreadsheetId>");
const sheet = ss.getSheetByName("Form responses 1");
```

### Step 3: Set Up Email Tracking

1. Deploy as web app for tracking
2. Set up `doGet` function
3. Add tracking pixel to template

### Step 4: Set Up Trigger

1. In Apps Script Editor:
   - Go to **Triggers** (⏰ icon)
   - Create trigger for `sendBdayWishes`
   - Set to run daily (12am to 1am)

### Step 5: Done! 🎉

The script will now:

- Check for birthdays daily
- Send beautiful HTML emails
- Track email opens
- Update status with tracking info

---

## 🧠 How It Works

1. **Birthday Check**:

   - Loops through sheet rows
   - Compares current date with DOB

2. **Email Sending**:

   - Uses HTML template
   - Personalizes content
   - Adds tracking pixel

3. **Tracking**:
   - Records email opens
   - Updates sheet status
   - Logs viewing time

---

## 🔐 Permissions

The script needs access to:

- Google Sheets
- Gmail for sending emails
- Deploy as web app (for tracking)

---

## 🧪 Sample Output

> **Subject**: Happy Birthday [Name]  
> **Body**: A beautiful HTML email with:
>
> - Personalized greeting
> - Birthday message
> - Contact information
> - Tracking pixel

---

## 💬 Credits

Created by [Mohammed Ashad](https://github.com/e-labinnovations)  
Part of the **CakeMail** project!

---

## 🔄 Version History

- [v1](../v1/README.md) - Original version with Google Sheets and Doc templates
- ✅ v2 - Current version with HTML templates and tracking
- [v3](../v3/README.md) - Version with Google Contacts
- [v4](../v4/README.md) - Latest version with People API
