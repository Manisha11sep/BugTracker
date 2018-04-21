select * from issue
where
 name iLIKE CONCAT('%',$1,'%');
--  or description CONCAT('%',$1,'%');