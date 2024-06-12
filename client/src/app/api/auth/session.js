export default async function handler(req, res) {
  const session = req.session.get("session");

  console.log('Session data:', session); // Logging session data

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json({ session });
}
