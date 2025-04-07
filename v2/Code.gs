const ss = SpreadsheetApp.openById("<spreadsheetId>");
const sheet = ss.getSheetByName("Form responses 1");

const doGet = (e) => {
  //https://script.google.com/macros/s/{scriptId}/exec?method=viewed&email=test@gmail.com
  var method = e.parameter.method;
  var email = e.parameter.email;
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  var status = "Viewed on " + datetime;

  if (method == "viewed") {
    for (var i = 2; i <= sheet.getLastRow(); i++) {
      var rowMail = sheet.getRange(i, 3).getValue();

      if (rowMail == email) {
        sheet
          .getRange(i, 6)
          .setValue(sheet.getRange(i, 6).getValue() + "\n" + status);
      }
    }
  }
};

const sendBdayWishes = () => {
  var cDate = new Date(); //Present Day,
  for (var i = 2; i <= sheet.getLastRow(); i++) {
    var bDate = sheet.getRange(i, 4).getValue(); // Date from SpreadSheet

    if (cDate.getDate() == bDate.getDate()) {
      if (cDate.getMonth() == bDate.getMonth()) {
        var name = sheet.getRange(i, 2).getValue();
        var toMail = sheet.getRange(i, 3).getValue();
        var subject = "Happy Birthday " + name;

        var friend = {
          name: name,
          mail: toMail,
          subject: subject,
        };
        sendMail(friend);
        sheet.getRange(i, 6).setValue("Wish sent in " + cDate.getFullYear());
      }
    }
  }
};

const sendMail = (friend) => {
  var templ = HtmlService.createTemplateFromFile("template");
  templ.friend = friend;
  var message = templ.evaluate().getContent();

  MailApp.sendEmail({
    to: friend.mail,
    subject: friend.subject,
    htmlBody: message,
  });
};

const testMail = () => {
  var friend = {
    name: "Mohammed Ashad",
    mail: "<email>",
    subject: "Happy Birthday",
  };
  sendMail(friend);
};

const logQuata = () => {
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
};
