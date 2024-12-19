# NOT A FILE
A simple web app to convert any uploaded file to a base64 string and then create a secret gist using your GitHub token (OAuth workflow).

## Motivation
I can't send any attachments to external email addresses for any purpose. So, I convert the file to a string and send the secret gist link.

## Limitation
It has many limitations, but I find it sufficient for use. Some of them are:
- File size is limited by the JavaScript FileReader API.
- Cloudflare workers for authentication (limitations are not yet known by me).
- Gist has a maximum string size or a maximum number of created gists.

## Contact
<div id="header" align="center">
  <div id="badges">
  <a href="https://t.me/@applemeomeow">
    <img src="https://img.shields.io/badge/applemeomeow-black?style=for-the-badge&logo=telegram" alt="Telegram Badge"/>
  </a>
  <a href="https://www.facebook.com/wolf.xforce/">
    <img src="https://img.shields.io/badge/wolf.xforce-blue?style=for-the-badge&logo=facebook" alt="Facebook Badge"/>
  </a>
  <a href="mailto:ericvuuvan@gmail.com">
    <img src="https://img.shields.io/badge/contact%20me-black?style=for-the-badge&logo=gmail" alt="Email Badge"/>
  </a>
</div>

</div>
