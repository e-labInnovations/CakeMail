# 🎂 CakeMail v4

The latest version of CakeMail, now using the People API for enhanced contact management, with Telegram integration and improved security features.

---

## ✨ Features

- Uses Google People API (replacing deprecated ContactsApp)
- Sends beautiful, responsive HTML birthday emails with:
  - Custom branding and logo
  - Animated birthday cake images
  - Personalized greeting with recipient's name
  - Social media links
  - Contact information
  - Email tracking pixel
- Tracks email opens using a tracking pixel
- Sends notifications via:
  - Telegram bot for:
    - Birthday wishes sent
    - Email opens
    - Upcoming birthdays (next day)
  - Optional WhatsApp integration (using whatabot.net)
- Sends personalized birthday emails at midnight (12AM–1AM)
- Stores tracking information in contact notes
- Secure credential management using PropertiesService

---

## 📁 What You Need

### 1. Google Contacts Setup

- Add contacts with:
  - Full name
  - Email address
  - Birthday date
  - (Optional) Phone number
  - (Optional) Notes for tracking

### 2. HTML Email Template

A beautiful, responsive HTML email template (`mail-template.html`) that includes:

- Modern design with gradient background
- Animated cupcake images
- Social media integration
- Contact section
- Tracking pixel integration
- Mobile-responsive design
- Email client compatibility

### 3. Notification Setup

- Telegram Bot:
  - Create a bot using BotFather
  - Get API key and chat ID
- Optional WhatsApp Integration:
  - A WhatsApp API key (from whatabot.net)
  - A phone number for receiving notifications

---

## 🛠️ Setup Instructions

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new script
3. Create two files:
   - `Code.gs` - Main script file
   - `mail-template.html` - Email template

### Step 2: Configure the Script

Set up the following configuration in Project Settings:

1. Open your Apps Script project
2. Click on **Project Settings** (⚙️ icon on left)
3. Under **Script Properties**, add the following properties:

```
// Required Properties
TELEGRAM_API_KEY: "your_telegram_bot_token"
TELEGRAM_CHAT_ID: "your_chat_id"
CONTACT_PAGE_SIZE: "1000" // Optional, defaults to 1000

// Optional Properties (for WhatsApp integration)
WHATSAPP_API_KEY: "your_whatsapp_api_key"
WHATSAPP_PHONE_NUMBER: "your_phone_number"
```

4. Click **Save script properties**

> **Note**: Using Properties Service through project settings is more secure than hardcoding credentials in the script. The properties are stored securely and can be managed without modifying the code.

### Step 3: Set Up Email Tracking

The script includes a tracking mechanism that works via:

1. A tracking pixel in the email template
2. A `doGet` function that records when emails are opened
3. Updates contact notes with viewing timestamps

### Step 4: Set Up Triggers

Set up the following time-based triggers manually:

1. Open your Apps Script project
2. Click on **Triggers** (⏰ icon on left)
3. Click **Add Trigger** button
4. For each trigger, configure as follows:

#### Trigger 1: Daily Birthday Check

- **Choose which function to run**: `checkBirthdays`
- **Choose which deployment should run**: `Head`
- **Select event source**: `Time-driven`
- **Select type of time based trigger**: `Day timer`
- **Select time of day**: `12am to 1am`

#### Trigger 2: Birthday Notifications

- **Choose which function to run**: `sendBirthdayNotification`
- **Choose which deployment should run**: `Head`
- **Select event source**: `Time-driven`
- **Select type of time based trigger**: `Day timer`
- **Select time of day**: `9pm to 10pm`

5. Click **Save** for each trigger

> **Note**: These triggers will run automatically at the specified times to check for birthdays and send notifications.

### Step 5: Deploy as Web App

- Deploy the script as a web app to enable email tracking
- Set access to "Anyone, even anonymous"
- Copy the deployment URL for the `SCRIPT_URL` in your properties

### Step 6: Done! 🎉

Once setup, CakeMail v4 will:

- Check daily at midnight for any birthdays
- Send beautiful HTML birthday emails
- Track when emails are opened
- Send Telegram notifications for:
  - Birthday wishes sent
  - Email opens
  - Upcoming birthdays (next day)
- Optionally send WhatsApp notifications

---

## 🧠 How It Works

1. **Birthday Check**: The script runs daily at midnight
2. **Email Sending**:
   - For each birthday match in Google Contacts, it creates a personalized HTML email
   - Uses the template with the recipient's name
   - Includes a tracking pixel
3. **Tracking**:
   - When the email is opened, the tracking pixel triggers
   - The `doGet` function records the view
   - Updates contact notes with viewing timestamp
4. **Notifications**:
   - Sends Telegram alerts when birthday wishes are sent
   - Notifies when emails are opened
   - Alerts about upcoming birthdays (next day)
   - Optionally sends WhatsApp notifications

---

## 🔐 Permissions

The script requires the following permissions:

- Access to Google People API
- Send email on your behalf
- Deploy as a web app (for tracking)
- Access to Telegram API
- Optional access to WhatsApp API

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

> **Telegram Notifications**:
>
> - "Birthday wish sent to [Name]"
> - "[Name] has viewed the mail"
> - "[Name] has birthday tomorrow"
> - Optional WhatsApp notifications with similar content

---

## 💬 Credits

Created by [Mohammed Ashad](https://github.com/e-labinnovations)  
Part of the **CakeMail** project!

---

## 🔄 Version History

- [v1](../v1/README.md) - Original version with Google Sheets and Doc templates
- [v2](../v2/README.md) - Enhanced version with HTML templates and tracking
- [v3](../v3/README.md) - Version with Google Contacts and WhatsApp integration
- ✅ v4 - Latest version with People API and Telegram integration
