const menuButton = document.querySelector('#menu-button');
const mainNav = document.querySelector('#main-nav');

// 手機版選單：點擊按鈕後顯示或收起連結
menuButton.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
  menuButton.textContent = isOpen ? '×' : '☰';
});

// 選擇段落後自動收起手機選單
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '開啟選單');
    menuButton.textContent = '☰';
  });
});
