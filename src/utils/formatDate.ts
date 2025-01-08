export default function formatDate(isoDate: string) {
  const timestamp =
    isoDate.length > 13 ? Math.floor(Number(isoDate) / 1000) : Number(isoDate);
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];

  return `${day} of ${month} ${year}`;
}
