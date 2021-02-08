/*  --------- FUNÇÃO COM OPEN & CLOSE --------- */
// const Modal = {
//   open() {
//     document.querySelector('.modal-overlay').classList.toggle('active');
//   },
//   close() {
//     document.querySelector('.modal-overlay').classList.toggle('active');
//   },
// };

function toggleModal() {
  const Modal = document.querySelector('.modal-overlay');
  Modal.classList.toggle('active');
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50020,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Criação website',
    amount: 500001,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20012,
    date: '23/01/2021',
  },
];

const Transactions = {
  incomes() {
    let income = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transactions.incomes() + Transactions.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `;

    return html;
  },

  updateBalance() {
    document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(
      Transactions.incomes()
    );

    document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(
      Transactions.expenses()
    );

    document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(
      Transactions.total()
    );
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';

    value = String(value).replace(/\D/g, '');
    value = Number(value) / 100;
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return signal + value;
  },
};

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();
