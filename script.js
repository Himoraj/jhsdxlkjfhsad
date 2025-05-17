document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabHighlight = document.querySelector('.tab-highlight');
    const tabBar = document.querySelector('.tab-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function updateHighlightPosition(activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const barRect = tabBar.getBoundingClientRect();
        
        const left = buttonRect.left - barRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
        // Update active tab button
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        
        // Update active tab content
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tabContent === tabName);
        });
        
        // Update highlight position
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (activeButton) {
            updateHighlightPosition(activeButton);
        }
    }
    
    // Initialize
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.tab);
    }
    
    // Tab button click handlers
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Update on window resize
    window.addEventListener('resize', function() {
        const activeButton = document.querySelector('.tab-button.active');
        if (activeButton) {
            updateHighlightPosition(activeButton);
        }
    });
});

// Добавьте в конец файла
document.addEventListener('DOMContentLoaded', function() {
  const refreshIcon = document.querySelector('.Balance .refresh-icon');
  const modal = document.getElementById('balanceModal');
  const closeBtn = document.querySelector('.modal-close');
  const confirmBtn = document.querySelector('.confirm-btn');
  const paymentSelector = document.querySelector('.payment-selector');
  const selectorHeader = document.querySelector('.selector-header');
  const methodOptions = document.querySelectorAll('.method-option');
  const selectedMethodDisplay = document.getElementById('selectedMethodDisplay');
  const methodIconSelected = document.querySelector('.method-icon-selected');
  const methodNameSelected = document.querySelector('.method-name-selected');
  
  let selectedMethod = null;

  if (refreshIcon) {
    refreshIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      modal.style.display = 'flex';
      // Сброс выбора при открытии
      methodOptions.forEach(opt => opt.classList.remove('active'));
      paymentSelector.classList.remove('expanded');
      selectedMethodDisplay.style.display = 'none';
      selectedMethod = null;
    });
  }

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Открытие/закрытие списка методов
  selectorHeader.addEventListener('click', function() {
    paymentSelector.classList.toggle('expanded');
  });

  // Выбор метода оплаты
  methodOptions.forEach(option => {
    option.addEventListener('click', function() {
      const method = this.dataset.method;
      const iconSrc = this.querySelector('.method-icon').src;
      const methodName = this.querySelector('span').textContent;
      
      // Обновляем отображение выбранного метода
      methodIconSelected.src = iconSrc;
      methodNameSelected.textContent = methodName;
      selectedMethodDisplay.style.display = 'flex';
      
      // Закрываем список
      paymentSelector.classList.remove('expanded');
      selectedMethod = method;
    });
  });

  confirmBtn.addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const promo = document.getElementById('promo').value;
    
    if (!amount) {
      alert('Пожалуйста, введите сумму');
      return;
    }
    
    if (!selectedMethod) {
      alert('Пожалуйста, выберите способ оплаты');
      return;
    }
    
    // Здесь можно добавить логику обработки пополнения
    console.log(`Пополнение на ${amount} через ${selectedMethod} с промокодом ${promo}`);
    alert(`Инициировано пополнение на ${amount} через ${getMethodName(selectedMethod)}!`);
    modal.style.display = 'none';
  });

  function getMethodName(method) {
    const methods = {
      'card': 'банковскую карту',
      'crypto': 'криптовалюту',
      'sbp': 'СБП'
    };
    return methods[method] || method;
  }

  // Закрытие по клику вне окна
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});