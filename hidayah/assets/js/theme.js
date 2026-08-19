/* Darstellung vor dem ersten Bildaufbau setzen — verhindert Aufblitzen. */
(function () {
  try {
    var r = document.documentElement;
    var t = localStorage.getItem('hidayah:theme');
    var a = localStorage.getItem('hidayah:accent');
    if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t);
    if (a) r.setAttribute('data-accent', a);
  } catch (e) {}
}());
