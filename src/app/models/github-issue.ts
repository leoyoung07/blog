export interface GithubIssue {
  url: string;
  repositoryUrl: string;
  labelsUrl: string;
  commentsUrl: string;
  eventsUrl: string;
  htmlUrl: string;
  id: string;
  number: string;
  title: string;
  labels: IssueLabel[];
  state: string;
  milestone: IssueMilestone | null;
  comments: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
  body: string;
  summary: string;
  newCommentUrl: string;
}

export interface IssueLabel {
  name: string;
  color: string;
}

export interface IssueMilestone {
  url: string;
  htmlUrl: string;
  labelsUrl: string;
  id: number;
  nodeId: string;
  number: number;
  title: string;
  description: string;
}
