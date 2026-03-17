function formatNumber(num) {
   return Math.floor(num).toLocaleString("id-ID");
}


const dateFormatter = new Intl.DateTimeFormat("id-ID", {
   weekday: "long",
   day: "numeric",
   month: "long",
   year: "numeric"
});

function formatDisplayDate(date) {
   return dateFormatter.format(new Date(date));
}

const shortDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "2-digit"
});

function formatShortDate(date) {
  return shortDateFormatter
    .format(new Date(date))
    .replace("/", " / ");
}