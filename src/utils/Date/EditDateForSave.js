import dayjs from "dayjs";

export default function (date, dateFormat) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const dt = new Date(date.replace(pattern,'$3-$2-$1'));
  return dayjs(dt).format(dateFormat)
}
