export type LegalPageKey = 'terms' | 'privacy' | 'data-protection'

export const legalPages = {
  terms: {
    badge: 'Terms',
    title: 'Terms Of Use',
    summary:
      'These terms explain how schools, administrators, staff, and visitors may use ThinkSchool App and related services.',
    sections: [
      {
        title: 'Use Of The Platform',
        body: 'ThinkSchool App is provided to help educational institutions manage academic, administrative, financial, attendance, payroll, inventory, medical, and CBT workflows. Users must access the platform only for lawful school operations and must not attempt to misuse, disrupt, copy, or compromise the service.',
      },
      {
        title: 'Accounts And Access',
        body: 'Administrators are responsible for creating accounts, assigning appropriate roles, and keeping access details secure. Users must keep passwords confidential and notify the school or platform administrator if they suspect unauthorized access.',
      },
      {
        title: 'Content And Records',
        body: 'Schools remain responsible for the accuracy of information entered into the system, including student records, scores, fees, attendance, payroll, medical notes, and other institutional data.',
      },
      {
        title: 'Service Changes',
        body: 'Features may be updated, improved, added, or removed as the platform evolves. Where possible, material changes will be communicated through the appropriate support or administrative channels.',
      },
    ],
  },
  privacy: {
    badge: 'Privacy',
    title: 'Privacy Policy',
    summary:
      'This policy describes how ThinkSchool App handles information used to support school management and communication.',
    sections: [
      {
        title: 'Information We Process',
        body: 'ThinkSchool App may process account details, school records, academic information, attendance records, fee information, payroll records, contact details, support requests, and uploaded files needed to provide the service.',
      },
      {
        title: 'How Information Is Used',
        body: 'Information is used to operate the platform, provide support, manage school workflows, generate reports, maintain security, and improve the reliability of the service.',
      },
      {
        title: 'Access Control',
        body: 'Access is controlled through user roles and permissions. Schools should ensure that users are assigned only the access required for their responsibilities.',
      },
      {
        title: 'Data Retention',
        body: 'Records are retained as needed for school operations, legal obligations, security, support, and continuity of service unless deletion is requested and permitted by applicable requirements.',
      },
    ],
  },
  'data-protection': {
    badge: 'Data Protection',
    title: 'Data Protection',
    summary:
      'ThinkSchool App is designed to help schools protect sensitive education, staff, parent, and operational data.',
    sections: [
      {
        title: 'Security Measures',
        body: 'The platform uses authentication, password hashing, role-based access, structured database storage, and administrative controls to help protect school data.',
      },
      {
        title: 'School Responsibilities',
        body: 'Schools should keep user access current, remove inactive users, use strong passwords, restrict administrative privileges, and ensure staff understand their data responsibilities.',
      },
      {
        title: 'Uploads And Documents',
        body: 'Uploaded files should be limited to appropriate school-related content. Schools should avoid uploading unnecessary sensitive files and should review access permissions regularly.',
      },
      {
        title: 'Incident Handling',
        body: 'If a data issue or unauthorized access is suspected, administrators should act quickly by disabling affected accounts, reviewing access, and contacting support for further guidance.',
      },
    ],
  },
} satisfies Record<
  LegalPageKey,
  {
    badge: string
    title: string
    summary: string
    sections: { title: string; body: string }[]
  }
>
