select count(issue_id) as Comment_count, issue_id 
from comment
group by issue_id;