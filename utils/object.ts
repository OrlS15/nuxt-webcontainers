export function assignNestedObject(base: Record<any, any>, names: any[], value?: any) {
  // If a value is given, remove the last name and keep it for later:
  let lastName = value ? names.pop() : false;

  // Walk the hierarchy, creating new objects where needed.
  // If the lastName was removed, then the last object is not set yet:
  for (let i = 0; i < names.length; i++) {
    base = base[names[i]] = base[names[i]] || {};
  }

  // If a value was given, set it to the last name:
  if (lastName) base = base[lastName] = value;

  // Return the last object in the hierarchy:
  return base;
}

export function accessNestedObject(base: Record<any, any>, names: any[]) {
  // if error return undefined
  try {
    return names.reduce((prev, curr) => prev && prev[curr], base);
  } catch (e) {
    return undefined;
  }
}
