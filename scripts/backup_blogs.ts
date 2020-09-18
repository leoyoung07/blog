import { GithubService } from '../src/app/services/github.service';
import { RenderService } from '../src/app/services/render.service';
import fs from 'fs';
import path from 'path';

const backupDir = path.join(__dirname, '..', 'backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

(async () => {
  try {
    const issues = await (new GithubService(new RenderService())).fetchIssues();
    issues.forEach((issue) => {
      const filePath = path.join(backupDir, issue.title + '.md');
      fs.writeFileSync(filePath, issue.body, {
        encoding: 'utf8',
        flag: 'w',
      });
      console.log(`backup success: ${issue.title}.md`);
    });
  } catch (error) {
    console.log(error);
  }
})();
