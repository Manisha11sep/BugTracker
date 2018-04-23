select posted_by ,count(issue_id) as Comment_count
from comment
group by posted_by;