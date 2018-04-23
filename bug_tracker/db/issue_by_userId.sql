select * from issue;
select users.id,issue.name as Issue_Title,issue.description,users.username as Posted_By, issue.last_updated
from users
join issue
on users.id = issue.creater_id;