const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '24026511768-o5967lh5ritou31uud6rpt36habllff5.apps.googleusercontent.com';
const CLIENT_SECRET = 'DJm8-yb0fosOf7nyDSDrXfrd';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04GgdDzkwAr38CgYIARAAGAQSNwF-L9IrUQRyFN3DiWPg65Od73ltdHMHQ_qq7mbeEaUfxEZoX8lIvv6QO32O12u3kuyg3GXI33E';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const filePath = path.join(__dirname, 'img.jpg');

//upload data at google drive;


async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'example.jpg', //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

uploadFile();

//Delete Data from Drive

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: '1z9rIS0QauT0R1n4xH_pz86tfjDEP_Okq',
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

  deleteFile();

  //generate drive access url

async function generatePublicUrl() {
  try {
    const fileId = '1_fHbVyDiA8Mp_-iha1CPuz7DKyDGaepU';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
} 

generatePublicUrl() 