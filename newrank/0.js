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
