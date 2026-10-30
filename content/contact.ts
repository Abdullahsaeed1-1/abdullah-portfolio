export const contactCopy = {
  heading: "Tell me what you are trying to automate.",
  line: "Send me the problem rather than the spec. If building it is not worth your money, I would rather tell you that now than halfway through.",
  success: "Got it. I will reply within a day.",
  fields: {
    name: "Name",
    email: "Email",
    message: "What you want built",
    budget: "Budget range"
  },
  budgetOptions: [
    "Under $1,000",
    "$1,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000+",
    "Not sure yet"
  ],
  submit: "Send",
  submitting: "Sending",
  errors: {
    required: "Required.",
    email: "Needs a valid email address.",
    failed: "That did not send. Try again, or email me directly.",
    notConfigured: "The form is not connected yet. Email me directly instead."
  }
} as const;
