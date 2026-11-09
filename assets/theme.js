(() => {
  const key='jasonbook_dark';
  const apply=()=>document.documentElement.classList.toggle('dark-mode',localStorage.getItem(key)==='1');
  apply();
  window.JasonBookTheme={toggle(){localStorage.setItem(key,localStorage.getItem(key)==='1'?'0':'1');apply();},apply};
  document.addEventListener('DOMContentLoaded',apply);
})();
