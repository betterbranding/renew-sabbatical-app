-- Update health goals for the two most complete sessions (jan-2026 and feb-2025)
-- These have the actual Notion inline database goals

-- Clear blank goals for these sessions
DELETE FROM health_goals WHERE session_id IN ('session-jan-2026', 'session-feb-2025');

-- Jan 2026 + Feb 2025: Spiritual Health goals
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Spiritual Health', 'Morning prayer time', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Spiritual Health', 'Monthly tithing to church', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Spiritual Health', 'Freedom/Deliverance session', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Spiritual Health', 'Read Celebration of Discipline', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Spiritual Health', 'Find a Mentor', 'Not started', NULL, 4);

-- Jan 2026: Physical Health goals
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Physical Health', 'Lose 20 lbs', 'Not started', '2026-02-28', 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Physical Health', 'Gym/Walk 5x week', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Physical Health', 'Start a yoga class', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Physical Health', 'Hernia surgery', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Physical Health', 'Fit in my jeans again', 'Not started', NULL, 4);

-- Jan 2026: Mental Health goals
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Mental Health', 'Read The Power of Now', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Mental Health', 'Find a legit Therapist', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Mental Health', 'Daily prayer/meditation', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Mental Health', 'Visit Terra Quantum 2x/week', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Mental Health', 'Setup Notion habit tracker', 'Not started', NULL, 4);

-- Jan 2026: Financial Health goals
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Financial Health', 'Find a solid bookkeeper', 'Not started', '2026-01-30', 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Financial Health', '$15k/month income', 'Not started', '2026-03-01', 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Financial Health', 'Invest in quantum computing', 'Not started', '2026-04-30', 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Financial Health', 'Open a savings acct', 'Not started', '2026-02-28', 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Financial Health', 'Pay off 2 credit cards', 'Not started', '2026-03-30', 4);

-- Jan 2026: Relational Health goals
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Relational Health', 'Date night w/ Keri 2x month', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Relational Health', '10 second kisses daily', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Relational Health', 'Find couple counseling', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Relational Health', 'Schedule siblings get-together', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-jan-2026', 'Relational Health', 'Alternate kids 1-on-1 time every week', 'Not started', NULL, 4);

-- Copy same goals to Feb 2025 (same Notion template data)
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Spiritual Health', 'Morning prayer time', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Spiritual Health', 'Monthly tithing to church', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Spiritual Health', 'Freedom/Deliverance session', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Spiritual Health', 'Read Celebration of Discipline', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Spiritual Health', 'Find a Mentor', 'Not started', NULL, 4);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Physical Health', 'Lose 20 lbs', 'Not started', '2025-02-28', 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Physical Health', 'Gym/Walk 5x week', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Physical Health', 'Start a yoga class', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Physical Health', 'Hernia surgery', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Physical Health', 'Fit in my jeans again', 'Not started', NULL, 4);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Mental Health', 'Read The Power of Now', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Mental Health', 'Find a legit Therapist', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Mental Health', 'Daily prayer/meditation', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Mental Health', 'Visit Terra Quantum 2x/week', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Mental Health', 'Setup Notion habit tracker', 'Not started', NULL, 4);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Financial Health', 'Find a solid bookkeeper', 'Not started', '2025-01-30', 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Financial Health', '$15k/month income', 'Not started', '2025-03-01', 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Financial Health', 'Invest in quantum computing', 'Not started', '2025-04-30', 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Financial Health', 'Open a savings acct', 'Not started', '2025-02-28', 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Financial Health', 'Pay off 2 credit cards', 'Not started', '2025-03-30', 4);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Relational Health', 'Date night w/ Keri 2x month', 'Not started', NULL, 0);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Relational Health', '10 second kisses daily', 'Not started', NULL, 1);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Relational Health', 'Find couple counseling', 'Not started', NULL, 2);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Relational Health', 'Schedule siblings get-together', 'Not started', NULL, 3);
INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('session-feb-2025', 'Relational Health', 'Alternate kids 1-on-1 time every week', 'Not started', NULL, 4);

-- Update health entry reflections for sessions that have them
UPDATE health_entries SET feel_if_accomplish = 'Rooted. Closer. Peaceful.', what_if_dont = 'I''ll feel lacking and incomplete.' WHERE session_id = 'session-jan-2026' AND area = 'Spiritual Health';
UPDATE health_entries SET feel_if_accomplish = 'Peaceful. Not stressed. Focused.', what_if_dont = 'Constant stress and chaos. Not feeling steady. Feeling reactive.' WHERE session_id = 'session-jan-2026' AND area = 'Mental Health';
UPDATE health_entries SET feel_if_accomplish = 'Good. Accomplished. On track. Matured. On the right path.', what_if_dont = 'I''ll feel lacking and scared. Money chaos stresses me out.' WHERE session_id = 'session-jan-2026' AND area = 'Financial Health';

-- Same reflections for Feb 2025
UPDATE health_entries SET feel_if_accomplish = 'Rooted. Closer. Peaceful.', what_if_dont = 'I''ll feel lacking and incomplete.' WHERE session_id = 'session-feb-2025' AND area = 'Spiritual Health';
UPDATE health_entries SET feel_if_accomplish = 'Peaceful. Not stressed. Focused.', what_if_dont = 'Constant stress and chaos. Not feeling steady. Feeling reactive.' WHERE session_id = 'session-feb-2025' AND area = 'Mental Health';
UPDATE health_entries SET feel_if_accomplish = 'Good. Accomplished. On track. Matured. On the right path.', what_if_dont = 'I''ll feel lacking and scared. Money chaos stresses me out.' WHERE session_id = 'session-feb-2025' AND area = 'Financial Health';

-- Update Jan 2026 people with real names from Notion
UPDATE people SET name = 'Find a Therapist' WHERE session_id = 'session-jan-2026' AND area = 'Mental Health';
UPDATE people SET name = 'Roger Frye' WHERE session_id = 'session-jan-2026' AND area = 'Spiritual Health';
UPDATE people SET name = 'Adrian Delgado' WHERE session_id = 'session-jan-2026' AND area = 'Physical Health';
UPDATE people SET name = 'John Critz' WHERE session_id = 'session-jan-2026' AND area = 'Relational Health';
UPDATE people SET name = 'Penny Armbruster' WHERE session_id = 'session-jan-2026' AND area = 'Financial Health';

-- Update Jan 2026 Hi 5 goals with real data
UPDATE goals SET name = 'Setup Notion Habit-Tracker', due_date = '2026-04-30' WHERE session_id = 'session-jan-2026' AND area = 'Mental';
UPDATE goals SET name = 'Schedule Hernia Surgery', due_date = '2026-04-30' WHERE session_id = 'session-jan-2026' AND area = 'Physical';
UPDATE goals SET name = '$15K/mth income', due_date = '2026-04-30' WHERE session_id = 'session-jan-2026' AND area = 'Financial';
UPDATE goals SET name = 'Read Celebration of Discipline', due_date = '2026-04-30' WHERE session_id = 'session-jan-2026' AND area = 'Spiritual';
