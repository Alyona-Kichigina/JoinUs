export const isMimeTypeAllowed = (unAllowedMimeTypesArr, positiveLock) => file => {
  const a = unAllowedMimeTypesArr.some(type => type.test(file.name))
  return (positiveLock ? !a : a) ? Error(`${file.name}: file type doesn't match with allowed file types`) : file
}

export const isFileSizeAllowed = fileSizeMb => file => file.size < (typeof fileSizeMb === "number"
  ? fileSizeMb
  : parseInt(fileSizeMb, 10) * 1048576)
  ? file
  : Error(`${file.name}: file weight should not exceed ${fileSizeMb} type doesn't match with allowed file types`)
