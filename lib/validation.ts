
const BANNED_TERMS = [
  "admin", "root", "system", "support",
  // Add common vulgarities/slurs here. 
  // For the purpose of this demo, we'll keep it simple but extensible.
  "badword", "offensive", "hate"
];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { valid: false, error: "Username is required" };
  }
  
  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  
  if (username.length > 20) {
    return { valid: false, error: "Username must be less than 20 characters" };
  }

  // Regex: Alphanumeric and underscores only
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, and underscores" };
  }

  const lowerCaseName = username.toLowerCase();
  
  // Check against banned terms (exact match or partial containment depending on strictness)
  // Here we do simple inclusion check
  for (const term of BANNED_TERMS) {
    if (lowerCaseName.includes(term)) {
       return { valid: false, error: "Username contains inappropriate content" };
    }
  }

  return { valid: true };
}
