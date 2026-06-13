export function formatNumber(num) {
   // bulatkan angka dan format ke rupiah style Indonesia
   return Math.round(num).toLocaleString("id-ID");
}

// formatter tanggal lengkap (hari, tanggal, bulan, tahun)
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
   weekday: "long",
   day: "numeric",
   month: "long",
   year: "numeric"
});

export function formatDisplayDate(date) {
   // ubah string tanggal jadi format panjang
   return dateFormatter.format(new Date(date));
}

// formatter tanggal pendek (dd/mm)
const shortDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "2-digit"
});

export function formatShortDate(date) {
  // ubah tanggal jadi format pendek dan tambah spasi
  return shortDateFormatter
    .format(new Date(date))
    .replace("/", " / ");
}
