SET @add_plan_name_column = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE contact_submissions ADD COLUMN plan_name VARCHAR(150) DEFAULT NULL AFTER service_id',
    'SELECT 1'
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'contact_submissions'
    AND COLUMN_NAME = 'plan_name'
);
PREPARE add_plan_name_column_statement FROM @add_plan_name_column;
EXECUTE add_plan_name_column_statement;
DEALLOCATE PREPARE add_plan_name_column_statement;

INSERT INTO header_nav_items (label, href, sort_order, is_active)
VALUES
  ('Home', '#home', 1, 1),
  ('About', '#about', 2, 1),
  ('Features', '#features', 3, 1),
  ('Services', '#services', 4, 1),
  ('Testimonials', '#testimonial', 5, 1),
  ('Team', '#team', 6, 1),
  ('Pricing', '#pricing', 7, 1),
  ('Contact', '#contact', 8, 1)
ON DUPLICATE KEY UPDATE
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO services (icon, title, description, sort_order, is_active)
VALUES
  ('tabler:school', 'Academics', 'Manage classes, departments, subjects, sessions, timetables, lesson planning, and teacher allocations.', 1, 1),
  ('tabler:report-analytics', 'Exam & Records', 'Create exam structures, process scores, calculate grades, generate report cards, transcripts, and performance reports.', 2, 1),
  ('tabler:users', 'User Management', 'Create users for students, teachers, parents, accountants, medical staff, and personnel with secure permissions.', 3, 1),
  ('tabler:device-laptop', 'CBT', 'Build question banks, schedule online tests, set time limits, grade objective exams, and release results quickly.', 4, 1),
  ('tabler:packages', 'Inventory Management', 'Track books, laboratory equipment, supplies, furniture, uniforms, stock levels, distribution, and usage history.', 5, 1),
  ('tabler:calendar-check', 'Attendance Management', 'Record student and staff attendance digitally, monitor punctuality, and generate attendance reports instantly.', 6, 1),
  ('tabler:cash-banknote', 'Fees Management', 'Create fee structures, generate invoices, record payments, issue receipts, and monitor outstanding balances.', 7, 1),
  ('tabler:receipt-tax', 'Payroll', 'Automate salary structures, allowances, deductions, payslips, payment history, and monthly salary processing.', 8, 1),
  ('tabler:medical-cross', 'Medical Report', 'Store clinic visits, allergies, medication, immunization records, health conditions, and emergency contacts securely.', 9, 1)
ON DUPLICATE KEY UPDATE
  icon = VALUES(icon),
  description = VALUES(description),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO testimonials (image_url, name, role, rating, description, sort_order, is_active)
VALUES
  ('/src/assets/images/team/avatar-1.jpg', 'School Administrator', 'Admin Office', 4.8, 'ThinkSchool gives our management team one place to monitor academics, records, payments, and staff activity.', 1, 1),
  ('/src/assets/images/team/avatar-3.jpg', 'Class Teacher', 'Teacher', 4.6, 'Attendance, lesson planning, assessments, and report cards are easier to manage without moving between many tools.', 2, 1),
  ('/src/assets/images/team/avatar-5.jpg', 'Finance Lead', 'Accountant', 4.7, 'The fees and payroll modules help us stay organized, track balances, and reduce errors in monthly processing.', 3, 1),
  ('/src/assets/images/team/avatar-6.jpg', 'Parent Representative', 'Parent', 4.5, 'Parents get clearer communication and better visibility into student progress, attendance, and school activity.', 4, 1)
ON DUPLICATE KEY UPDATE
  image_url = VALUES(image_url),
  rating = VALUES(rating),
  description = VALUES(description),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO team_members (image_url, name, role, bio, twitter_url, facebook_url, linkedin_url, sort_order, is_active)
VALUES
  ('/src/assets/images/team/user-1.jpg', 'Product Implementation', 'Onboarding & training', 'Product strategy, implementation, support, and training for schools adopting ThinkSchool.', '', '', '', 1, 1),
  ('/src/assets/images/team/user-4.jpg', 'Customer Support', 'Schools success', 'Ongoing customer care for administrators, teachers, accountants, parents, and school teams.', '', '', '', 2, 1)
ON DUPLICATE KEY UPDATE
  image_url = VALUES(image_url),
  bio = VALUES(bio),
  twitter_url = VALUES(twitter_url),
  facebook_url = VALUES(facebook_url),
  linkedin_url = VALUES(linkedin_url),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO pricing_plans (name, description, price, currency, billing_period, billing_note, button_label, button_url, badge_label, theme, sort_order, is_active)
VALUES
  ('Start up', 'A focused rollout for schools beginning with core records, attendance, academics, and users.', NULL, 'GBP', NULL, 'Quoted after school needs review', 'Request Quote', '#contact', NULL, 'info', 1, 1),
  ('Standard', 'A broader package for schools ready to manage academic, finance, attendance, user, and reporting workflows.', NULL, 'GBP', NULL, 'Best for full institution deployment', 'Request Demo', '#contact', NULL, 'primary', 2, 1),
  ('Premium', 'Full institution support with advanced modules, guided implementation, staff training, reporting, and ongoing support.', NULL, 'GBP', NULL, 'Advanced rollout and ongoing support', 'Contact Us', '#contact', 'Popular', 'info', 3, 1)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  price = VALUES(price),
  currency = VALUES(currency),
  billing_period = VALUES(billing_period),
  billing_note = VALUES(billing_note),
  button_label = VALUES(button_label),
  button_url = VALUES(button_url),
  badge_label = VALUES(badge_label),
  theme = VALUES(theme),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO contact_settings (heading, description, phone_label, phone, email_label, email, is_active)
VALUES
  ('Contact Us', 'We are here to help you explore ThinkSchool, request a demo, or discuss the right plan for your institution.', 'Call Us Directly At', '+2348035089474', 'Email Our Team', 'info@thinkschoolapps.co.uk', 1)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  phone_label = VALUES(phone_label),
  phone = VALUES(phone),
  email_label = VALUES(email_label),
  email = VALUES(email),
  is_active = VALUES(is_active);
