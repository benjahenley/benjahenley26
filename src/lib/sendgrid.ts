export async function sendMail(data: any) {
  const sendMail = await fetch("/api/mail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });

  try {
    const sendMailData = await sendMail.json();
    return sendMailData;
  } catch (err: any) {
    return new Error(err.message);
  }
}
