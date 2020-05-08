'use strict';
import GitHubApiService from '../src/services/GitHubApiService';
import fs from 'fs';
import path from 'path';

const backupDir = path.join(__dirname, '..', 'backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

(async () => {
  try {
    const issues = await GitHubApiService.fetchIssues();
    issues.forEach(issue => {
      const filePath = path.join(backupDir, issue.title + '.md');
      fs.writeFileSync(filePath, issue.body, {
        encoding: 'utf8',
        flag: 'w'
      });
      console.log(`backup success: ${issue.title}.md`);
    });
  } catch (error) {
    console.log(error);
  }
})();
