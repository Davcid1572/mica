export const PASSWORD_MIN = 6; // matches the backend's minimum length
export const passwordHint = `At least ${PASSWORD_MIN} characters`;

/** Turns backend validation strings into MICA's voice. */
export function signUpMessage(raw: string): string {
  const m = raw.toLowerCase();
  if (m.includes("already") || m.includes("exist") || m.includes("taken"))
    return "There's already an account with that email. Want to sign in instead?";
  if (m.includes("email"))
    return "That email doesn't look quite right. Mind checking it?";
  if (m.includes("password"))
    return `Choose a password with at least ${PASSWORD_MIN} characters.`;
  if (m.includes("name")) return "Tell us what to call you.";
  return "Please check your details and try again.";
}
