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

### 1. A Google Sheet like this

[📋 Sample Sheet](https://docs.google.com/spreadsheets/d/1c7eOIiUi-fphSxCjzEV2bGc1wmc2DwwL7pNzNpOYNdc/edit?usp=sharing)

It should include:

| Timestamp         | Name | Date of Birth | Mail Id          | Phone Number | Occupation         | Status           |
| ----------------- | ---- | ------------- | ---------------- | ------------ | ------------------ | ---------------- |
| 1/6/2019 13:56:38 | Rick | 1/15/1943     | rick@elabins.com | optional     | Scientist Inventor | Bday wishes sent |

### 2. A Google Doc as your email template

[📄 Sample Template Doc](https://docs.google.com/document/d/1-iktISoHDoPmZX8yL7Q1DvYb9jhSrwmcBlCyPa08ntA/edit?usp=sharing)

Use the placeholder `#name#` inside the doc where you want the recipient's name to appear.

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

- Go to [script.google.com](https://script.google.com)
- Create a new script
- Paste in the contents of [`v1/src/main.gs`](./src/main.gs)

### Step 2: Replace Placeholders

In the script, replace the following with your own values:

```js
var ss = SpreadsheetApp.openByUrl("<replace with your sheet url>");
var templateId = "<replace with your google doc template id>";
```

### Step 3: Set a Time-Based Trigger

- In the Apps Script Editor:
  - Go to **Triggers** (⏰ icon on left)
  - Create a new trigger for `sendBdayWishes`
  - Choose **Time-driven → Day timer → 12am to 1am**

### Step 4: Done! 🎉

Once setup, CakeMail v1 will:

- Check daily at midnight for any birthdays
- Send personalized emails using the HTML template
- Update the "Status" column in your sheet

---

## 🧠 How It Works

1. It loops through the rows in the sheet
2. Compares the current date with each contact's DOB
3. For matches, it:
   - Replaces `#name#` in the Google Doc template
   - Converts it to HTML
   - Sends a birthday email
   - Updates the status in the sheet

---

## 🔐 Permissions

First run may require authorization. The script needs permission to:

- Access Google Sheets
- Access Google Docs and Drive
- Send email on your behalf

---

## 🧪 Sample Output

> **Subject**: Happy BirthDay Rick  
> **Body**: _(HTML content from your template with Rick’s name inserted)_

---

## 💬 Credits

Created by [Mohammed Ashad](https://github.com/e-labinnovations)  
Inspired by a YouTube tutorial back in 2019. Brought to life and now open-sourced as part of **CakeMail**!
