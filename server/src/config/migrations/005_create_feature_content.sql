CREATE TABLE IF NOT EXISTS feature_articles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  icon VARCHAR(150) DEFAULT NULL,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  excerpt TEXT DEFAULT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  published_at DATE DEFAULT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_feature_articles_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS feature_updates (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_article_id BIGINT UNSIGNED DEFAULT NULL,
  icon VARCHAR(150) DEFAULT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  version_label VARCHAR(100) DEFAULT NULL,
  release_date DATE DEFAULT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_feature_updates_title (title),
  INDEX idx_feature_updates_article_id (feature_article_id),
  CONSTRAINT fk_feature_updates_article
    FOREIGN KEY (feature_article_id) REFERENCES feature_articles(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO feature_articles (icon, title, slug, excerpt, content, image_url, published_at, sort_order, is_active)
VALUES
  (
    'tabler:apps',
    'All-in-One School Management Platform',
    'all-in-one-school-management-platform',
    'Manage academics, examinations, attendance, fees, payroll, inventory, medical records, and CBT from one secure ThinkSchool system.',
    'ThinkSchool is designed as a centralized platform for schools that want to replace manual paperwork and disconnected tools. It brings academic and administrative workflows together so administrators, teachers, students, parents, accountants, and school staff can work with better visibility and fewer errors.',
    NULL,
    CURRENT_DATE(),
    1,
    1
  ),
  (
    'tabler:shield-lock',
    'Secure Role-Based Access',
    'secure-role-based-access',
    'Give each school user the right level of access based on their role and responsibility.',
    'Role-based access helps schools protect sensitive information while still giving every team member the tools they need. Administrators can manage accounts for students, teachers, parents, accountants, medical staff, and personnel while assigning permissions that match daily responsibilities.',
    NULL,
    CURRENT_DATE(),
    2,
    1
  ),
  (
    'tabler:chart-infographic',
    'Real-Time Reporting For Better Decisions',
    'real-time-reporting-for-better-decisions',
    'Turn daily activity into reports for academics, finance, attendance, inventory, and student support.',
    'ThinkSchool helps school leaders make data-driven decisions with real-time reporting and clear operational insight. By bringing records into one system, institutions can monitor progress, identify gaps, and improve productivity across departments.',
    NULL,
    CURRENT_DATE(),
    3,
    1
  ),
  (
    'tabler:cloud-cog',
    'Scalable For Modern Institutions',
    'scalable-for-modern-institutions',
    'Built for primary schools, secondary schools, colleges, and training institutions that need room to grow.',
    'The platform is built for institutions with growing digital management needs. Whether a school starts with core records or rolls out a complete administrative suite, ThinkSchool can scale with the institution as processes become more connected.',
    NULL,
    CURRENT_DATE(),
    4,
    1
  )
ON DUPLICATE KEY UPDATE
  icon = VALUES(icon),
  title = VALUES(title),
  excerpt = VALUES(excerpt),
  content = VALUES(content),
  image_url = VALUES(image_url),
  published_at = VALUES(published_at),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

INSERT INTO feature_updates (feature_article_id, icon, title, description, version_label, release_date, sort_order, is_active)
VALUES
  (NULL, 'tabler:school', 'Academics', 'Manage classes, departments, subjects, sessions, timetables, lesson planning, and teacher allocations.', 'Core Module', CURRENT_DATE(), 1, 1),
  (NULL, 'tabler:report-analytics', 'Exam & Records', 'Create exam structures, process scores, calculate grades, generate report cards, transcripts, and performance reports.', 'Core Module', CURRENT_DATE(), 2, 1),
  (NULL, 'tabler:users', 'User Management', 'Create users for students, teachers, parents, accountants, medical staff, and personnel with secure permissions.', 'Core Module', CURRENT_DATE(), 3, 1),
  (NULL, 'tabler:device-laptop', 'CBT', 'Build question banks, schedule online tests, set time limits, grade objective exams, and release results quickly.', 'Added Feature', CURRENT_DATE(), 4, 1),
  (NULL, 'tabler:packages', 'Inventory Management', 'Track books, laboratory equipment, supplies, furniture, uniforms, stock levels, distribution, and usage history.', 'Added Feature', CURRENT_DATE(), 5, 1),
  (NULL, 'tabler:calendar-check', 'Attendance Management', 'Record student and staff attendance digitally, monitor punctuality, and generate attendance reports instantly.', 'Core Module', CURRENT_DATE(), 6, 1),
  (NULL, 'tabler:cash-banknote', 'Fees Management', 'Create fee structures, generate invoices, record payments, issue receipts, and monitor outstanding balances.', 'Core Module', CURRENT_DATE(), 7, 1),
  (NULL, 'tabler:receipt-tax', 'Payroll', 'Automate salary structures, allowances, deductions, payslips, payment history, and monthly salary processing.', 'Added Feature', CURRENT_DATE(), 8, 1),
  (NULL, 'tabler:medical-cross', 'Medical Report', 'Store clinic visits, allergies, medication, immunization records, health conditions, and emergency contacts securely.', 'Added Feature', CURRENT_DATE(), 9, 1)
ON DUPLICATE KEY UPDATE
  feature_article_id = VALUES(feature_article_id),
  icon = VALUES(icon),
  description = VALUES(description),
  version_label = VALUES(version_label),
  release_date = VALUES(release_date),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

UPDATE header_settings
SET cta_label = 'View Features',
    cta_url = '/features'
WHERE id = 1;
