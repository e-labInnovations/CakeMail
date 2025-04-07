const CONFIG = {
  WHATSAPP_API_KEY: "", // To be set via environment variables or properties
  WHATSAPP_PHONE_NUMBER: "", // To be set via environment variables or properties
  SCRIPT_ID: "", // To be set via environment variables or properties
};

const sendBdayWishes = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const today_month = monthNames[today.getMonth()].toUpperCase();
  const today_date = today.getDate();
  var contacts = ContactsApp.getContacts();
  contacts.forEach((contact) => {
    var dates = contact.getDates(ContactsApp.Field.BIRTHDAY);
    if (dates) {
      dates.forEach((bday) => {
        const emails = contact.getEmails();
        if (emails.length) {
          const b_date = bday.getDay();
          const b_month = bday.getMonth();
          if (b_date == today_date && b_month == today_month) {
            const name = contact.getFullName().split("@")[0].trim();
            emails.forEach((emailField) => {
              const email = emailField.getAddress();
              const friend = {
                name: name,
                mail: email,
                subject: "🎂 Happy Birthday " + name,
                id: contact.getId(),
              };
              sendMail(friend);
              addUserNote(
                contact.getId(),
                "BDay Wish sent on " + today.getFullYear() + " to " + email
              );
            });
          }
        }
      });
    }
  });
};

const sendMail = (friend) => {
  var templ = HtmlService.createTemplateFromFile("template2");
  templ.data = {
    name: friend.name,
    view_link:
      `https://script.google.com/macros/s/${CONFIG.SCRIPT_ID}/exec?method=viewed&id=` +
      friend.id,
    year: new Date().getFullYear(),
  };
  var message = templ.evaluate().getContent();

  MailApp.sendEmail({
    to: friend.mail,
    subject: friend.subject,
    htmlBody: message,
  });
};

const addUserNote = (id, note) => {
  var contact = ContactsApp.getContactById(id);
  contact.setNotes(note + "\n" + contact.getNotes());
};

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
    var status = "Viewed on " + datetime;
    const contact = ContactsApp.getContactById(id);
    addUserNote(contact.getId(), status);
    UrlFetchApp.fetch(
      `https://api.whatabot.net/whatsapp/sendMessage?apikey=${
        CONFIG.WHATSAPP_API_KEY
      }&text=${contact.getFullName()} has viewed the mail&phone=${
        CONFIG.WHATSAPP_PHONE_NUMBER
      }`
    );
    return ContentService.createTextOutput("Ok");
  }
  return ContentService.createTextOutput("Error");
};

const showContacts = () => {
  var contacts = ContactsApp.getContacts();
  contacts.forEach((contact) => {
    var dates = contact.getDates(ContactsApp.Field.BIRTHDAY);
    if (dates) {
      dates.forEach((bday) => {
        const emails = contact.getEmails();
        if (emails.length) {
          const b_day = bday.getDay();
          const b_month = bday.getMonth();
          Logger.log(`
          Name  : ${contact.getFullName()}
          Email : ${emails[0].getAddress()}
          DOB   : ${b_day} ${b_month} ${bday.getYear()}
          Phone : ${contact.getPhones().map((phoneField) => {
            return phoneField.getPhoneNumber();
          })}
          `);
        }
      });
    }
  });
};

// Will trigger on every day at 10:00 AM to send whatsapp alert to the user
const sendWhatsappAlert = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow_month = monthNames[tomorrow.getMonth()].toUpperCase();
  const tomorrow_date = tomorrow.getDate();
  var contacts = ContactsApp.getContacts();
  contacts.forEach((contact) => {
    var dates = contact.getDates(ContactsApp.Field.BIRTHDAY);
    if (dates) {
      dates.forEach((bday) => {
        const b_date = bday.getDay();
        const b_month = bday.getMonth();
        if (b_date == tomorrow_date && b_month == tomorrow_month) {
          const name = contact.getFullName().split("@")[0].trim();
          UrlFetchApp.fetch(
            `https://api.whatabot.net/whatsapp/sendMessage?apikey=${
              CONFIG.WHATSAPP_API_KEY
            }&text=${contact.getFullName()} has birthday tomorrow&phone=${
              CONFIG.WHATSAPP_PHONE_NUMBER
            }`
          );
        }
      });
    }
  });
};
