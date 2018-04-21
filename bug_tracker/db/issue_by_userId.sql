select * from issue;
select users.id,users.username,issue.name,issue.description, issue.last_updated
from users
join issue
on users.id = issue.creater_id;