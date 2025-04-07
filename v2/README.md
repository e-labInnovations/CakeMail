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

### 1. A Google Sheet with the following structure

[📋 Sample Sheet](https://docs.google.com/spreadsheets/d/1CjCzzu-bKQw4tVEWIVJycJeNhwYwbQVr1ZmICNRUB1o/edit?gid=538178223#gid=538178223)

| Timestamp          | Name | Mail ID          | Birthday  | Mobile NO | Status                                             |
| ------------------ | ---- | ---------------- | --------- | --------- | -------------------------------------------------- |
| 10/18/2020 6:53:42 | Rick | rick@elabins.com | 1/15/1943 | optional  | "Wish sent in 2022\nViewed on 4/6/2022 @ 12:34:19" |

### 2. HTML Email Template

The template (`template.html`) is a beautiful, responsive HTML email template that includes:

- Custom branding and logo
- Birthday message
- Contact information
- Email tracking pixel

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new script
3. Create two files:
   - `Code.gs` - Main script file
   - `template.html` - Email template

### Step 2: Configure the Script

In `Code.gs`, replace the following with your own values:

```js
const ss = SpreadsheetApp.openById("<spreadsheetId>");
const sheet = ss.getSheetByName("Form responses 1");
```

### Step 3: Set Up Email Tracking

The script includes a tracking mechanism that works via:

1. A tracking pixel in the email template
2. A `doGet` function that records when emails are opened
3. Updates the status column with viewing timestamps

### Step 4: Set a Time-Based Trigger

- In the Apps Script Editor:
  - Go to **Triggers** (⏰ icon on left)
  - Create a new trigger for `sendBdayWishes`
  - Choose **Time-driven → Day timer → 12am to 1am**

### Step 5: Done! 🎉

Once setup, CakeMail v2 will:

- Check daily at midnight for any birthdays
- Send beautiful HTML birthday emails
- Track when emails are opened
- Update the "Status" column with tracking information

---

## 🧠 How It Works

1. **Birthday Check**: The script runs daily at midnight
2. **Email Sending**:
   - For each birthday match, it creates a personalized HTML email
   - Uses the template with the recipient's name
   - Includes a tracking pixel
3. **Tracking**:
   - When the email is opened, the tracking pixel triggers
   - The `doGet` function records the view
   - Updates the status column with viewing timestamp

---

## 🔐 Permissions

The script requires the following permissions:

- Access to Google Sheets
- Send email on your behalf
- Deploy as a web app (for tracking)

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

- [v1](../v1/README.md) - Original version with Google Doc templates
- ✅ v2 - Current version with HTML templates and tracking
- [v3](../v3/README.md) - Next version
- [v4](../v4/README.md) - Latest version
