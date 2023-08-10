(e.GetTimeStamp = function (e) {
  return e ? Date.now().toString().substring(0, e) : Date.now().toString();
}),
  (e.GetNowDate = function () {
    return new Date();
  }),
  (e.GetTimeStampByDate = function (e, t) {
    return t ? e.getTime().toString().substring(0, t) : e.getTime().toString();
  }),
  (e.TimeStampToDateTimeStr = function (e) {
    if (!e) return "参数不能为空";
    try {
      return i.format(i.fromUnixTime(parseInt(e)), "yyyy-MM-dd HH:mm:ss");
    } catch (t) {
      return "非法时间戳";
    }
  }),
  (e.Now = function () {
    return i.format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }),
  (e.Today = function () {
    return new Date(i.format(new Date(), "yyyy-MM-dd 00:00:00"));
  }),
  (e.AddZeroDay = function (e, t) {
    void 0 === t && (t = "yyyy-MM-dd HH:mm:ss");
    var n = new Date(i.format(new Date(), "yyyy-MM-dd 00:00:00"));
    return n.setHours(n.getHours() + 24 * e), new Date(i.format(n, t));
  }),
  (e.TimeStampToDateTime = function (e) {
    if (!e) throw "参数不能为空";
    return i.fromUnixTime(parseInt(e));
  }),
  (e.GetChinaGMTDate = function () {
    return new Date();
  }),
  (e.Parse = function (e) {
    return new Date(e);
  }),
  (e.AddSeconds = function (e, t) {
    void 0 === t && (t = "yyyy-MM-dd HH:mm:ss");
    var n = new Date();
    return n.setSeconds(n.getSeconds() + e), new Date(i.format(n, t));
  }),
  (e.AddMinutes = function (e, t) {
    void 0 === t && (t = "yyyy-MM-dd HH:mm:ss");
    var n = new Date();
    return n.setMinutes(n.getMinutes() + e), new Date(i.format(n, t));
  }),
  (e.AddDays = function (e, t) {
    void 0 === t && (t = "yyyy-MM-dd HH:mm:ss");
    var n = new Date();
    return n.setHours(n.getHours() + 24 * e), new Date(i.format(n, t));
  }),
  (e.AddDaysFrom = function (e, t, n) {
    void 0 === n && (n = "yyyy-MM-dd HH:mm:ss");
    var i = e;
    return i.setHours(i.getHours() + 24 * t), i;
  }),
  (e.AddHours = function (e, t) {
    void 0 === t && (t = "yyyy-MM-dd HH:mm:ss");
    var n = new Date();
    return n.setHours(n.getHours() + e), new Date(i.format(n, t));
  }),
  (e.FormartDateToStr = function (e, t) {
    return void 0 === t && (t = "yyyy-MM-dd HH:mm:ss"), i.format(e, t);
  }),
  (e.AddMinutesString = function (e) {
    return i.format(i.addMinutes(new Date(), e), "yyyy-MM-dd HH:mm:ss");
  }),
  (e.FormatString = function (e, t) {
    return void 0 === t && (t = "yyyy-MM-dd HH:mm:ss"), i.format(e, t);
  }),
  (e.AddDaysFromOneDay = function (e, t, n) {
    void 0 === n && (n = "yyyy-MM-dd HH:mm:ss");
    var o = new Date(e);
    return o.setHours(o.getHours() + 24 * t), new Date(i.format(o, n));
  }),
  (e.GetTicks = function (e) {
    var t = (1e4 * new Date().getTime() + 621355968e9).toString();
    if (
      ((t = t.substring(0, t.length - 4)),
      (t += Math.ceil(1e4 * Math.random()).toString()),
      t.length > e)
    )
      return t.substring(0, e);
    for (var n = e - t.length, i = "", o = 0; o < n; o++)
      i += Math.ceil(10 * Math.random()).toString();
    return t + i;
  }),
  (e.IsBefore = function (e, t) {
    return i.isBefore(e, t);
  }),
  (e.IsSameDay = function (e, t) {
    return i.isSameDay(e, t);
  });

Oe["effectiveTime"] = parseInt(
  o.DateHelper.GetTimeStampByDate(o.DateHelper.Parse(Ee), 10)
);

new Date(e);
// https://finder.video.qq.com/251/20302/stodownload?bizid=1023&dotrans=0&encfilekey=Cvvj5Ix3eewK0tHtibORqcsqchXNh0Gf3sJcaYqC2rQCsx73uXlAw5r7Sn8DFkjvFmKuCRgqPZheugDSfgjHckA7ElfeGOuzxw9q0mm2TbGMDRPIibtwIDicdA2nONSSqwib&hy=SH&idx=1&m=&scene=0&token=cztXnd9GyrF9zIC2a62esibFUia9iaQNTPFwdb6EQrRYvH6NU7SWjsNIECfP14wgsKVQtkbvptNLSm22ibRmm5o99Q&upid=500030
// https://finder.video.qq.com/251/20302/stodownload?bizid=1023&dotrans=0&encfilekey=Cvvj5Ix3eewK0tHtibORqcsqchXNh0Gf3sJcaYqC2rQCsx73uXlAw5r7Sn8DFkjvFmKuCRgqPZhdOsmO1nCS4b5nibyiccBMmukz2USoSO4973I3gZriaGcBq07uFUibFxa0d&hy=SH&idx=1&m=&scene=0&token=cztXnd9GyrEFthyKlR4tagjEtNAIJmQND6TIQs1XN9MzeAxrH1n8SYhs179V8nRgmqT78OYGayKT52CBR12X7Q&upid=0
// https://finder.video.qq.com/251/20302/stodownload?bizid=1023&dotrans=0&encfilekey=rjD5jyTuFrIpZ2ibE8T7YmwgiahniaXswqzldmJo62ibpgPLy3z5MBkYYGCsIz2fctkxh9QgQ6ZWqiagic092bMaht9EZqQ3n1ibNgDDdXdKbhpoqRgNHnU8OIlzg&hy=SH&idx=1&m=&scene=0&token=6xykWLEnztK4PX62Ov4aiccTlZicSicibfHvjKkMRvYLHsDHa8VCt1HrGwKmpRTWKR0wnXbmDRGEibT8CkwfiaMaq2Jw&upid=290150
