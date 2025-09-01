import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from 'src/google-auth/google-auth.service';

@Injectable()
export class DocsService {
  constructor(private readonly googleAuth: GoogleAuthService) {}

  async readDoc(docId: string) {
    const auth = this.googleAuth.getClient();
    const docs = google.docs({ version: 'v1', auth });
    const res = await docs.documents.get({ documentId: docId });

    const content: string[] = [];
    res.data.body?.content?.forEach((el) => {
      if (el.paragraph) {
        el.paragraph.elements?.forEach((e) => {
          if (e.textRun?.content) {
            content.push(e.textRun.content);
          }
        });
      }
    });

    return { title: res.data.title, content: content.join('') };
  }

  async editDoc(docId: string, text: string) {
    const auth = this.googleAuth.getClient();
    const docs = google.docs({ version: 'v1', auth });

    await docs.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 }, // inserts after start
              text,
            },
          },
        ],
      },
    });

    return { message: 'Text inserted successfully' };
  }

  async deleteDoc(docId: string) {
    const auth = this.googleAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });

    await drive.files.delete({ fileId: docId });
    return { message: 'Document deleted successfully' };
  }

  async watchFile(fileId: string, webhookUrl: string) {
    const auth = this.googleAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });
    const channel = {
      id: `${Date.now()}`,
      type: 'web_hook',
      address: webhookUrl,
    };

    const res = await drive.files.watch({
      fileId,
      requestBody: channel,
    });

    return res.data;
  }
}
