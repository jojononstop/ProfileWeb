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

const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');
const submitButton = contactForm.querySelector('button[type="submit"]');
const supabaseUrl = 'https://xhbvhvdsyyvotmyljqls.supabase.co';
const supabaseKey = 'sb_publishable_IzeSJnpdYxBB4vDTEiGjxA_B_RiLPvc';

// 表單送出後，將需求資料新增到 Supabase 資料表。
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent = '請先完成所有欄位。';
    contactForm.reportValidity();
    return;
  }

  const clientName = document.querySelector('#client-name').value.trim();
  const websiteType = document.querySelector('#website-type').value;
  const clientEmail = document.querySelector('#client-email').value.trim();

  submitButton.disabled = true;
  formMessage.textContent = '正在提交資料，請稍候。';

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/website_requests`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        client_name: clientName,
        website_type: websiteType,
        client_email: clientEmail
      })
    });

    if (!response.ok) {
      throw new Error('資料提交失敗');
    }

    formMessage.textContent = `${clientName}，你的需求已成功提交！`;
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = '目前無法提交，請稍後再試。';
  } finally {
    submitButton.disabled = false;
  }
});
