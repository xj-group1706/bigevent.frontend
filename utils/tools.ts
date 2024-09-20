export const getImageUrl = (url: string | undefined) => {
  if (!url) return "";
  const config = useRuntimeConfig();
  const baseImageUrl = config.public.imageUrl;
  return `${baseImageUrl}${url}`;
};

function addZeroBeforeMonth(e: string) {
  return e.length > 1 ? e : "0" + e;
}

export function downloadImage(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url;
  a.click();
}

export function priceFormatter(price, languageCode?, currency?) {
  return new Intl.NumberFormat(languageCode || "uz", {
    style: "currency",
    currency: currency || "UZS",
  }).format(price);
}

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export const getDateTime = (stringDate: string) => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = addZeroBeforeMonth((1 + date.getMonth()).toString());
  const day = addZeroBeforeMonth(date.getDate().toString());
  const hours = addZeroBeforeMonth(date.getHours().toString());
  const minutes = addZeroBeforeMonth(date.getMinutes().toString());
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const getDate = (stringDate: string) => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = addZeroBeforeMonth((1 + date.getMonth()).toString());
  const day = addZeroBeforeMonth(date.getDate().toString());
  return `${day}.${month}.${year}`;
};

export const isValidDate = (day: number, month: number, year: number) => {
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  ) {
    return true;
  }
  return false;
};

export const stringToDate = (date: string | Date) => {
  if (date) {
    if (date instanceof Date) return date;
    let parses: Array<string> = [];
    if (date.includes(".")) {
      parses = date.split(".");
    } else if (date.includes("/")) {
      parses = date.split("/");
    } else if (date.includes("-")) {
      parses = date.split("-");
    }
    const day = parses[0];
    const month = parses[1];
    const year = parses[2];
    return new Date(`${month}/${day}/${year}`);
  }
  return date;
};

export const phoneSpaceRemover = (phone: string) => {
  phone = phone.includes("+") ? phone.substring(1) : phone;
  return `+${phone.split(" ").join("")}`;
};

export const phoneFormatter = (phone: string) => {
  if (phone && phone.length > 0) {
    phone = phone.includes("+") ? phone.substring(1) : phone;
    const match: RegExpMatchArray | null = phone.match(
      /^(\d{3})(\d{2})(\d{3})(\d{4})$/
    );
    if (match) return `+(${match[1]})${match[2]} ${match[3]}-${match[4]}`;
  }
  return "";
};

export function joinWithCamelCase(strings: string[]): string {
  return strings
    .map((word, index) => {
      if (index !== 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word.toLowerCase();
    })
    .join("");
}
