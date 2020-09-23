alter table candidate_interviews_assignments  
   add constraint check_interview_status_code 
   check (interview_status_code in ('P', 'I', 'C', 'D', 'R'))
   
-- Interview Status Codes   
-- P = Pending
-- I = Incomplete
-- C = Complete
-- D = Deferred
-- R - Reassigned