import avatar1 from '@/assets/images/team/avatar-1.jpg'
import avatar3 from '@/assets/images/team/avatar-3.jpg'
import avatar5 from '@/assets/images/team/avatar-5.jpg'
import avatar6 from '@/assets/images/team/avatar-6.jpg'

export type FeaturesType = {
  icon: string
  title: string
  description: string
}
export type ServicesType = {
  icon: string
  title: string
  description: string
}

export type TestimonialType = {
  image: string
  name: string
  description: string
  role: string
  star: number
}

export const featuresData: FeaturesType[] = [
  {
    icon: 'tabler:apps',
    title: 'All-in-One Platform',
    description: 'Manage academics, examinations, attendance, fees, payroll, inventory, medical records, and CBT from one secure system.',
  },
  {
    icon: 'tabler:shield-lock',
    title: 'Role-Based Access',
    description: 'Give administrators, teachers, students, parents, accountants, and staff the right access for their responsibilities.',
  },
  {
    icon: 'tabler:chart-infographic',
    title: 'Real-Time Reporting',
    description: 'Turn daily school activity into clear reports that support faster decisions and better institutional oversight.',
  },
  {
    icon: 'tabler:cloud-cog',
    title: 'Scalable Architecture',
    description: 'Built for primary schools, secondary schools, colleges, and training institutions that need room to grow.',
  },
]

export const servicesData: ServicesType[] = [
  {
    icon: 'tabler:school',
    title: 'Academics',
    description: 'Manage classes, departments, subjects, sessions, timetables, lesson planning, and teacher allocations.',
  },
  {
    icon: 'tabler:report-analytics',
    title: 'Exam & Records',
    description: 'Create exam structures, process scores, calculate grades, generate report cards, transcripts, and performance reports.',
  },
  {
    icon: 'tabler:users',
    title: 'User Management',
    description: 'Create users for students, teachers, parents, accountants, medical staff, and personnel with secure permissions.',
  },
  {
    icon: 'tabler:device-laptop',
    title: 'CBT',
    description: 'Build question banks, schedule online tests, set time limits, grade objective exams, and release results quickly.',
  },
  {
    icon: 'tabler:packages',
    title: 'Inventory Management',
    description: 'Track books, laboratory equipment, supplies, furniture, uniforms, stock levels, distribution, and usage history.',
  },
  {
    icon: 'tabler:calendar-check',
    title: 'Attendance Management',
    description: 'Record student and staff attendance digitally, monitor punctuality, and generate attendance reports instantly.',
  },
  {
    icon: 'tabler:cash-banknote',
    title: 'Fees Management',
    description: 'Create fee structures, generate invoices, record payments, issue receipts, and monitor outstanding balances.',
  },
  {
    icon: 'tabler:receipt-tax',
    title: 'Payroll',
    description: 'Automate salary structures, allowances, deductions, payslips, payment history, and monthly salary processing.',
  },
  {
    icon: 'tabler:medical-cross',
    title: 'Medical Report',
    description: 'Store clinic visits, allergies, medication, immunization records, health conditions, and emergency contacts securely.',
  },
]

export const testimonialData: TestimonialType[] = [
  {
    image: avatar1,
    name: 'School Administrator',
    description: 'ThinkSchool gives our management team one place to monitor academics, records, payments, and staff activity.',
    role: 'Admin Office',
    star: 4.8,
  },
  {
    image: avatar3,
    name: 'Class Teacher',
    description: 'Attendance, lesson planning, assessments, and report cards are easier to manage without moving between many tools.',
    role: 'Teacher',
    star: 4.6,
  },
  {
    image: avatar5,
    name: 'Finance Lead',
    description: 'The fees and payroll modules help us stay organized, track balances, and reduce errors in monthly processing.',
    role: 'Accountant',
    star: 4.7,
  },
  {
    image: avatar6,
    name: 'Parent Representative',
    description: 'Parents get clearer communication and better visibility into student progress, attendance, and school activity.',
    role: 'Parent',
    star: 4.5,
  },
]
