'use strict';
export default class GitHubIssue {
  get url () { return this._url; }
  get repositoryUrl () { return this._repositoryUrl; };
  get labelsUrl () { return this._labelsUrl; };
  get commentsUrl () { return this._commentsUrl; };
  get eventsUrl () { return this._eventsUrl; };
  get htmlUrl () { return this._htmlUrl; };
  get id () { return this._id; };
  get number () { return this._number; };
  get title () { return this._title; };
  get labels () { return this._labels; };
  get state () { return this._state; };
  get milestone () { return this._milestone; };
  get comments () { return this._comments; };
  get createdAt () { return this._createdAt; };
  get updatedAt () { return this._updatedAt; };
  get closedAt () { return this._closedAt; };
  get body () { return this._body; };
  get summary () { return this._summary; };

  set url (value) { this._url = value; }
  set repositoryUrl (value) { this._repositoryUrl = value; };
  set labelsUrl (value) { this._labelsUrl = value; };
  set commentsUrl (value) { this._commentsUrl = value; };
  set eventsUrl (value) { this._eventsUrl = value; };
  set htmlUrl (value) { this._htmlUrl = value; };
  set id (value) { this._id = value; };
  set number (value) { this._number = value; };
  set title (value) { this._title = value; };
  set labels (value) { this._labels = value; };
  set state (value) { this._state = value; };
  set milestone (value) { this._milestone = value; };
  set comments (value) { this._comments = value; };
  set createdAt (value) { this._createdAt = value; };
  set updatedAt (value) { this._updatedAt = value; };
  set closedAt (value) { this._closedAt = value; };
  set body (value) { this._body = value; };
  set summary (value) { this._summary = value; };
}
