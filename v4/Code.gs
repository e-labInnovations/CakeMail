/**
 * Configuration object for the application
 * @type {Object}
 * @property {string} telegramApiKey - API key for Telegram bot
 * @property {string} telegramChatId - Chat ID for Telegram notifications
 * @property {number} contactPageSize - Number of contacts to fetch per page
 * @property {string} scriptUrl - URL of the deployed script
 * @property {string} whatsappApiKey - API key for WhatsApp integration
 * @property {string} whatsappPhoneNumber - Phone number for WhatsApp notifications
 */
const config = {
  telegramApiKey:
    PropertiesService.getScriptProperties().getProperty("TELEGRAM_API_KEY"),
  telegramChatId:
    PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID"),
  contactPageSize:
    PropertiesService.getScriptProperties().getProperty("CONTACT_PAGE_SIZE") ||
    1000,
  scriptUrl:
    PropertiesService.getScriptProperties().getProperty("SCRIPT_URL") ||
    ScriptApp.getService().getUrl() ||
    "",
  whatsappApiKey:
    PropertiesService.getScriptProperties().getProperty("WHATSAPP_API_KEY"),
  whatsappPhoneNumber: PropertiesService.getScriptProperties().getProperty(
    "WHATSAPP_PHONE_NUMBER"
  ),
};

/**
 * Retrieves all contacts that have both birthday and email information
 * @returns {Array<Object>} Array of contact objects with name, email, and birthday information
 * @throws {Error} If People API is not enabled or other API errors occur
 */
const getBirthdayContacts = () => {
  // Check if People API is enabled
  try {
    // Get all connections (contacts) with necessary fields
    const people = People.People.Connections.list("people/me", {
      personFields: "names,birthdays,emailAddresses,phoneNumbers",
      pageSize: config.contactPageSize,
    });

    const connections = people.connections || [];
    const contacts = [];

    // Process each contact
    connections.forEach(function (person) {
      const hasBirthday = person.birthdays && person.birthdays.length > 0;
      const hasEmail =
        person.emailAddresses && person.emailAddresses.length > 0;

      // Only process contacts that have both birthday and email
      if (hasBirthday && hasEmail) {
        // Get name (display or given name)
        let contactName = "Unknown";
        if (person.names && person.names.length > 0) {
          contactName =
            person.names[0].displayName ||
            person.names[0].givenName ||
            "Unknown";
        }

        // Get primary email or first available
        const emails = person.emailAddresses.map((email) => email.value);

        contacts.push({
          name: contactName,
          emails: emails,
          birthday: person.birthdays[0].date,
          resourceName: person.resourceName,
          etag: person.etag,
          displayName: contactName.split("@")[0].trim(),
          phoneNumbers: person.phoneNumbers,
        });
      }
    });

    return contacts;
  } catch (e) {
    Logger.log("Error: " + e.toString());
    if (e.toString().includes("Advanced People Service is not enabled")) {
      Logger.log("Please enable the Advanced People Service:");
      Logger.log(
        "1. In your Google Apps Script project, go to Resources > Advanced Google Services"
      );
      Logger.log('2. Enable "People API"');
      Logger.log(
        "3. Also enable People API in Google Cloud Console when prompted"
      );
    }
  }
};

/**
 * Retrieves detailed information for a single contact
 * @param {string} contactId - The contact ID in format 'people/c123456789'
 * @returns {Object|null} Contact information object or null if not found
 * @throws {Error} If contact retrieval fails
 */
const getSingleContact = (contactId) => {
  try {
    // Validate contact ID format
    if (!contactId || !contactId.startsWith("people/")) {
      Logger.log(
        "Error: Invalid contact ID format. ID should be in format: people/c4311856924382512294"
      );
      return null;
    }

    // Define what fields to retrieve
    const fields = [
      "names",
      "emailAddresses",
      "birthdays",
      "biographies", // Notes field is part of biographies
      "phoneNumbers",
    ];

    // Retrieve the contact details
    const person = People.People.get(contactId, {
      personFields: fields.join(","),
    });

    if (!person) {
      Logger.log(`No contact found with ID: ${contactId}`);
      return null;
    }

    return person;
  } catch (e) {
    Logger.log(`Error retrieving contact: ${e.toString()}`);
    return null;
  }
};

/**
 * Sends birthday email to a contact using a template
 * @param {Object} contact - Contact object containing name and email information
 * @param {string} contact.displayName - Display name of the contact
 * @param {Array<string>} contact.emails - Array of email addresses
 * @returns {void}
 */
const sendBirthdayEmails = (contact) => {
  var mailTemplate = HtmlService.createTemplateFromFile("mail-template");
  mailTemplate.data = {
    name: contact.displayName,
    view_link: `${config.scriptUrl}?method=viewed&id=${contact.resourceName}`,
    year: new Date().getFullYear(),
  };
  var message = mailTemplate.evaluate().getContent();

  const emails = contact.emails.join(",");
  MailApp.sendEmail({
    to: emails,
    subject: `🎂 Happy Birthday ${contact.displayName}`,
    htmlBody: message,
  });
};

/**
 * Updates the biography/notes field for a contact
 * @param {string} contactId - The contact ID in format 'people/c123456789'
 * @param {string} newNote - The new note text to append
 * @returns {boolean} True if update was successful, false otherwise
 * @throws {Error} If contact update fails
 */
const updateContactNote = (contactId, newNote) => {
  // Validate inputs
  if (!contactId || !contactId.startsWith("people/")) {
    Logger.log(
      "Error: Invalid contact ID format. ID should be in format: people/c4311856924382512294"
    );
    return false;
  }

  if (newNote === undefined || newNote === null) {
    Logger.log("Error: Note text cannot be null or undefined");
    return false;
  }

  const contact = getSingleContact(contactId);
  const currentNote =
    contact.biographies && contact.biographies.length > 0
      ? contact.biographies[0].value
      : "";
  const updateNote = `${currentNote}${currentNote ? "\n" : ""}${newNote}`;
  if (contact.biographies && contact.biographies.length > 0) {
    contact.biographies[0].value = updateNote;
  } else {
    contact.biographies = [{ value: updateNote }];
  }

  // Update the contact
  const result = People.People.updateContact(contact, contact.resourceName, {
    updatePersonFields: "biographies",
  });

  if (result) {
    Logger.log(`Successfully updated notes for contact: ${contactId}`);
    return true;
  } else {
    Logger.log(`Error: Failed to update notes for contact: ${contactId}`);
    return false;
  }
};

/**
 * Sends a message to a Telegram chat
 * @param {string} message - The message to send
 * @param {Array<Object>} buttons - Array of button objects
 * @returns {string|undefined} Response from Telegram API or undefined if API key is not set
 */
const sendTelegramMessage = (message, buttons = []) => {
  if (!config.telegramApiKey || !config.telegramChatId) {
    Logger.log("Telegram API key or chat ID not set");
    return;
  }
  const url = `https://api.telegram.org/bot${config.telegramApiKey}/sendMessage`;
  const payload = {
    chat_id: config.telegramChatId,
    text: message,
    parse_mode: "Markdown",
    reply_markup:
      buttons.length > 0
        ? JSON.stringify({
            inline_keyboard: buttons.map((btn) => [
              {
                text: btn.text,
                url: btn.url,
              },
            ]),
          })
        : null,
  };
  const response = UrlFetchApp.fetch(url, {
    method: "POST",
    payload: payload,
  });
  return response.getContentText();
};

/**
 * Sends a message via WhatsApp
 * @param {string} message - The message to send
 * @returns {string|undefined} Response from WhatsApp API or undefined if API key is not set
 */
const sendWhatsappMessage = (message) => {
  if (!config.whatsappApiKey || !config.whatsappPhoneNumber) {
    Logger.log("WhatsApp API key or phone number not set");
    return;
  }
  const url = `https://api.whatabot.net/whatsapp/sendMessage?apikey=${config.whatsappApiKey}&text=${message}&phone=${config.whatsappPhoneNumber}`;
  const response = UrlFetchApp.fetch(url);
  return response.getContentText();
};

/**
 * Handles GET requests to the web app
 * @param {Object} e - Event object containing request parameters
 * @param {Object} e.parameter - Request parameters
 * @param {string} e.parameter.method - The method to execute
 * @param {string} e.parameter.id - The contact ID
 * @returns {ContentService.TextOutput} Response text
 */
const doGet = (e) => {
  var method = e.parameter.method;
  var id = e.parameter.id;
  id = id.replace("@", "%40");
  var today = new Date();
  var datetime =
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear() +
    " @ " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  if (method == "viewed") {
    var note = "Viewed on " + datetime;
    const contact = getSingleContact(id);
    const name = contact.names[0].displayName;
    const message = name + " has viewed the mail";
    updateContactNote(id, note);
    sendTelegramMessage(message);
    sendWhatsappMessage(message);
    return ContentService.createTextOutput("Ok");
  }
  return ContentService.createTextOutput("Error");
};

/**
 * Checks for birthdays today and sends birthday wishes
 * @returns {void}
 */
const checkBirthdays = () => {
  const contacts = getBirthdayContacts();
  const today = new Date();
  const today_month = today.getMonth() + 1;
  const today_date = today.getDate();
  contacts.forEach((contact) => {
    const b_date = contact.birthday.day;
    const b_month = contact.birthday.month;
    if (b_date == today_date && b_month == today_month) {
      sendBirthdayEmails(contact);
      const note = `BDay Wish sent on ${today.getFullYear()} to ${contact.emails.join(
        ", "
      )}`;
      updateContactNote(contact.resourceName, note);
      sendTelegramMessage(note);
      sendWhatsappMessage(note);
    }
  });
};

/**
 * Sends notifications about upcoming birthdays
 * @returns {void}
 */
const sendBirthdayNotification = () => {
  const contacts = getBirthdayContacts();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow_month = tomorrow.getMonth() + 1;
  const tomorrow_date = tomorrow.getDate();
  contacts.forEach((contact) => {
    const b_date = contact.birthday.day;
    const b_month = contact.birthday.month;
    if (b_date == tomorrow_date && b_month == tomorrow_month) {
      const wpWishLink =
        contact.phoneNumbers && contact.phoneNumbers.length > 0
          ? `https://wa.me/${contact.phoneNumbers[0].value}?text=🎉🎂🎈 Happy Birthday ${contact.displayName}! Wishing you a wonderful day filled with joy and happiness! 🎁🎊`
          : "https://google.com";
      const wpMsg = `*${contact.displayName}* has birthday tomorrow. ${wpWishLink}`;
      const tgMarkdownMsg = `*${contact.displayName}* has birthday tomorrow.`;
      const buttons = [
        {
          text: "Send a wish on whatsapp",
          url: wpWishLink,
        },
      ];
      sendTelegramMessage(tgMarkdownMsg, buttons);
      sendWhatsappMessage(wpMsg);
    }
  });
};

/**
 * Logs contact information for debugging purposes
 * @returns {void}
 */
const logContacts = () => {
  // const contacts = getBirthdayContacts();
  // Logger.log(contacts);

  const sampleContact = getSingleContact("people/c7750065237291080546");
  Logger.log(JSON.stringify(sampleContact));

  // updateContactNote("people/c3796997934458275881", "Test note");

  // const sampleContact2 = getSingleContact("people/c3796997934458275881");
  // Logger.log(sampleContact2);
};

function test() {
  const contacts = getBirthdayContacts();
  // Save log json to one file
  const logFile = DriveApp.createFile(
    "birthday_contacts.json",
    JSON.stringify(contacts),
    MimeType.PLAIN_TEXT
  );
}
