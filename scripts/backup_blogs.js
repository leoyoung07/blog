'use strict';
import GitHubApiService from '../src/services/GitHubApiService';
import fs from 'fs';
import path from 'path';

const backupDir = path.join(__dirname, '..', 'backup');

if (!fs.exists(backupDir)) {
  fs.mkdirSync(backupDir);
}

(async () => {
  const issues = await GitHubApiService.fetchIssues();
  issues.forEach(issue => {
    const filePath = path.join(backupDir, issue.title + '.md');
    fs.writeFileSync(filePath, issue.body, {
      encoding: 'utf8',
      flag: 'w'
    });
  });
})();
