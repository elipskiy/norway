class Budget {
  constructor(data) {
    this.data = data;
    this.container = document.querySelector('#budget .grid');
  }

  render() {
    const container = this.container;
    container.innerHTML = '';

    const euroAmounts = [
      '1 570–2 620',
      '440–610',
      '175–305',
      '90–175',
      '525–875',
      '265–435',
      '175–435',
    ];
    let totalMin = 0, totalMax = 0;
    euroAmounts.forEach(a => {
      const [min,max] = a.split('–').map(v=>parseInt(v.replace(/\s/g,'')));
      totalMin += min;
      totalMax += max || min;
    });

    this.data.forEach(item => {
      const el = document.createElement('div');
      el.className = 'bg-white border border-gray-200 rounded-lg p-4';
      el.innerHTML = `<h3 class="font-semibold text-primary mb-2">${item.category}</h3><p class="text-2xl font-bold text-primary mb-1">${item.amount}</p><p class="text-muted text-sm">${item.note}</p>`;
      container.appendChild(el);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'bg-blue-50 border border-blue-200 rounded-lg p-4 md:col-span-2';
    totalDiv.innerHTML = `<h3 class="font-semibold text-primary mb-2">💰 Общий бюджет</h3><p class="text-3xl font-bold text-blue-700 mb-1">${totalMin.toLocaleString()}–${totalMax.toLocaleString()} €</p>`;
    container.appendChild(totalDiv);
  }
}

if (typeof module !== 'undefined') { module.exports = { Budget }; }
