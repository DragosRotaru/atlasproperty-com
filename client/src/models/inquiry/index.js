export type PreferredContact = {
  PHONE: "Phone",
  EMAIL: "Email",
};

export type InquiryType = {
  STUDENT: "Student",
  PROFESSIONAL: "Professional",
  PARENT: "Parent/Guardian",
};

export type Schools = {
  LAURIER: "Wilfrid Laurier University",
  WATERLOO: "University of Waterloo",
  OTHER: "Other",
};

export type LeaseTerms = {
  FOUR_MONTHS: "4 Months",
  EIGHT_MONTHS: "8 Months",
  TWELVE_MONTHS: "12 Months",
};

export type InquiryInput = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  preferredContact: PreferredContact,
  type: InquiryType,
  numTenants: number,
  startDate: string,
  leaseTerm: LeaseTerms,
  school?: Schools,
  message?: string,
};

export type Inquiry = InquiryInput & {
  _id: string,
  createdAt: string,
  modifiedAt: string,
};
