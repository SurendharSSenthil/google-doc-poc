---
# 📄 Google Docs Reader (NestJS)

This project demonstrates how to authenticate with Google and fetch the content of a Google Doc using **NestJS** + **Google APIs**.
---

## 🚀 Prerequisites

1. **Install Node.js (>=18)**
   👉 [Download here](https://nodejs.org/)

2. **Google Cloud Project Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (e.g., `paxi-doc-poc`)
   - Enable the following APIs:
     - **Google Docs API**
     - **Google Drive API**

   - Create **OAuth 2.0 Client ID** credentials:
     - Application Type: **Web Application**
     - Add **Authorized redirect URI**:

       ```
       http://localhost:3000/auth/google/callback
       ```

   - Download the JSON credentials → save as `credentials.json` in project root.

3. **Install dependencies**

   ```bash
   npm install
   ```

---

## ▶️ Running the App

Start the NestJS server:

```bash
npm run start:dev
```

This runs the app at:

```
http://localhost:3000
```

Swagger UI is available at:

```
http://localhost:3000/api
```

---

## 🔑 Authentication Flow (First Time)

1. Open Swagger → go to `GET /auth/google`
   This will redirect you to a **Google Sign-In page**.

2. Log in with your Google account.

3. Google will redirect to:

   ```
   http://localhost:3000/auth/google/callback?code=...
   ```

4. The app will exchange the `code` for an **access + refresh token** and save them to `token.json`.

   > ✅ This happens only once. Next time the app reuses the stored token.

---

## 📖 Reading a Google Doc

Once authenticated, you can fetch the text of a Google Doc:

1. Open Swagger → `GET /docs/:docId`
   Example:

   ```
   http://localhost:3000/docs/1A2B3C4D5E6F
   ```

   (Replace with your Google Doc ID from its URL)

2. The response will contain the document’s text content:

   ```json
   {
     "content": ["Heading 1", "Some paragraph text", "Another line"]
   }
   ```

---

## 🛠 Project Structure

```
src/
 ├─ app.module.ts       # Root module
 ├─ google/             # Google OAuth logic
 ├─ docs/               # Docs controller + service
 └─ google-auth.service.ts
credentials.json        # Google API credentials
token.json              # Saved OAuth tokens (auto-generated)
```

---

## ✅ Testing Steps

1. Run the app:

   ```bash
   npm run start:dev
   ```

2. Go to Swagger: [http://localhost:3000/api](http://localhost:3000/api)

3. Authenticate via `/auth/google`.

4. Copy a Google Doc link → extract its ID → call `/docs/{docId}`.

5. See the document content in JSON.

---

⚠️ Notes:

- Only Docs you **own** or have been **shared with your Google account** can be accessed.
- If token expires, delete `token.json` and re-authenticate.

---
