function sendBdayWishes() {
  var ss = SpreadsheetApp.openByUrl("<replace with your sheet url>"); //  Sheet Url
  var sheet = ss.getSheetByName("Form responses 1"); // Make Sure Sheet name matches at the bottom
  var templateId = "<replace with your google doc template id>"; // the template doc with placeholders

  var cDate = new Date(); //Present Day,
  for (var i = 2; i <= sheet.getLastRow(); i++) {
    var bDate = sheet.getRange(i, 3).getValue(); // Date from SpreadSheet

    if (cDate.getDate() == bDate.getDate()) {
      if (cDate.getMonth() == bDate.getMonth()) {
        var name = sheet.getRange(i, 2).getValue();
        var toMail = sheet.getRange(i, 4).getValue();
        sendMail(sheet, templateId, name, toMail);
        sheet.getRange(i, 7).setValue("Bday wishes sent");
      }
    }
  }
}

function sendMail(sheet, templateId, name, toMail) {
  var docId = DriveApp.getFileById(templateId).makeCopy("temp").getId();
  var doc = DocumentApp.openById(docId); // the temp copy
  var body = doc.getBody();

  body.replaceText("#name#", name); // update the temp doc
  doc.saveAndClose(); // save changes before conversion

  var url =
    "https://docs.google.com/feeds/download/documents/export/Export?id=" +
    docId +
    "&exportFormat=html";
  var param = {
    method: "get",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
  };

  var htmlBody = UrlFetchApp.fetch(url, param).getContentText();

  var trashed = DriveApp.getFileById(docId).setTrashed(true); // delete temp copy

  MailApp.sendEmail(toMail, "Happy BirthDay " + name, " ", {
    htmlBody: htmlBody,
  }); // send to myself to test
}
