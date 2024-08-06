"use server";

const PASSWORD = "12345";

export async function handleForm(previousState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const password = formData.get("password");
  if (password === PASSWORD) {
    return {
      isValidate: true,
      error: [],
    };
  } else {
    return {
      isValidate: false,
      errors: ["Wrong password. Try again!"],
    };
  }
}
