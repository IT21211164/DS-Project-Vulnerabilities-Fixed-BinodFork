export function sanitizeInput(input) {
    if (typeof input === 'string') {
      return input
        .replace(/\\/g, '\\\\')    // Escape backslashes
        .replace(/"/g, '\\"')      // Escape double quotes
        .replace(/'/g, "\\'")      // Escape single quotes
        .replace(/\n/g, '\\n')     // Escape newlines
        .replace(/\r/g, '\\r');    // Escape carriage returns
    }
    return input;
  }
  
export function sanitizeObject(obj) {
    if (typeof obj === 'object' && obj !== null) {
      const sanitizedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitizedObj[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitizedObj;
    } else if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item));
    }
    return sanitizeInput(obj);
  }

  