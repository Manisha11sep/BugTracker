select users.username, count(issue.creater_id) as Issue_Count
from issue
join users
on issue.creater_id = users.id 
group by users.username;