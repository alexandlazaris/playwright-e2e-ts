export function getLoginCredsFromEnv() {
  const usernameKey = process.env["USERNAME"];
  const passwordKey = process.env["PASSWORD"];
  if (!usernameKey) {
    throw new Error(`USERNAME env var is invalid: ${usernameKey}`);
  }
  else if (!passwordKey) {
    throw new Error(`PASSWORD env var is invalid: ${passwordKey}`);
  }
  return { usernameKey, passwordKey };
}
