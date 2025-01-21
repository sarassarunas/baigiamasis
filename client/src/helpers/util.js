export const extractFormData = (form) => {
    const formdata = new FormData(form);
    const data = {}

    for(const input of formdata.entries()) {
      data[input[0]] = input[1];
    }

    return data;
}

export function random(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
