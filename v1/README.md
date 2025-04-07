# 🎂 CakeMail v1

The OG version of CakeMail — a simple Google Apps Script setup that automatically sends birthday wishes via email, using data from a Google Sheet and a Google Doc template.

---

## ✨ Features

- Reads birthday data from a Google Sheet
- Uses a Google Doc as an HTML email template
- Sends personalized birthday emails at midnight (12AM–1AM)
- Marks contacts as "Bday wishes sent" after sending

---

## 📁 What You Need

### 1. Google Sheet Setup

[📋 Sample Sheet](https://docs.google.com/spreadsheets/d/1c7eOIiUi-fphSxCjzEV2bGc1wmc2DwwL7pNzNpOYNdc/edit?usp=sharing)

Required columns:

- Timestamp
- Name
- Date of Birth
- Mail Id
- Phone Number (optional)
- Occupation (optional)
- Status

### 2. Email Template

[📄 Sample Template Doc](https://docs.google.com/document/d/1-iktISoHDoPmZX8yL7Q1DvYb9jhSrwmcBlCyPa08ntA/edit?usp=sharing)

- Google Doc with HTML formatting
- Use `#name#` placeholder for recipient's name

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new script
3. Paste in the contents of `main.gs`

### Step 2: Configure the Script

Replace the following in the script:

```js
var ss = SpreadsheetApp.openByUrl("<your-sheet-url>");
var templateId = "<your-doc-template-id>";
```

### Step 3: Set Up Trigger

1. In Apps Script Editor:
   - Go to **Triggers** (⏰ icon)
   - Create trigger for `sendBdayWishes`
   - Set to run daily (12am to 1am)

### Step 4: Done! 🎉

The script will now:

- Check for birthdays daily
- Send personalized emails
- Update status in sheet

---

## 🧠 How It Works

1. **Birthday Check**:

   - Loops through sheet rows
   - Compares current date with DOB

2. **Email Sending**:

   - Gets template from Google Doc
   - Replaces `#name#` placeholder
   - Sends personalized email

3. **Status Update**:
   - Marks "Bday wishes sent" in sheet
   - Includes timestamp

---

## 🔐 Permissions

The script needs access to:

- Google Sheets
- Google Docs and Drive
- Gmail for sending emails

---

## 🧪 Sample Output

> **Subject**: Happy Birthday [Name]  
> **Body**: _(Formatted content from Google Doc template)_

---

## 💬 Credits

Created by [Mohammed Ashad](https://github.com/e-labinnovations)  
Part of the **CakeMail** project!

---

## 🔄 Version History

- ✅ v1 - Current version with Google Sheets and Doc templates
- [v2](../v2/README.md) - Enhanced version with HTML templates
- [v3](../v3/README.md) - Version with Google Contacts
- [v4](../v4/README.md) - Latest version with People API
