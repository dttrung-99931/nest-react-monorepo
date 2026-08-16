/**
 * Returns the initials for a given name.
 * - If the name is missing or empty, returns "?".
 * - If the name contains two or more words, uses the first character of the first and second words.
 * - If the name contains only one word, takes the first two characters.
 * - Always returns the initials in uppercase.
 * 
 * @param name - The input name string.
 */
export function getInitialsFromName(name?: string): string {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}