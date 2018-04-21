select comment.posted_by, comment.description as Comment, issue.id as Issue_id,issue.name as Issue_Title, issue.description
from comment
join issue
on comment.issue_id = issue.id;