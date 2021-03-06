// Function that toggle the visibility of the Modal Window
const Modal = {
  modal: document.querySelector('.modal-overlay'),

  toggle() {
    Modal.modal.classList.toggle('active');
  },
};

// Settings to use Local Storage
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  },

  set(transaction) {
    localStorage.setItem(
      'dev.finances:transactions',
      JSON.stringify(transaction)
    );
  },
};

// All transactions and functions
const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

// DOM objects and some functions to implement the new transactions
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  totalCard: document.querySelector('.total'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
        <td class="remove">
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
    `;

    return html;
  },

  updateBalance() {
    document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  },

  updateCardColor() {
    if (Transaction.total() > 0) {
      DOM.totalCard.style.background = '#2b9348';
    } else if (Transaction.total() < 0) {
      DOM.totalCard.style.background = '#ee6055';
    } else {
      DOM.totalCard.style.background = '';
    }
  },
};

// Formatter functions to prevent default application behavior
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

  formatAmount(value) {
    value = value * 100;

    return Math.round(value);
  },

  formatDate(date) {
    const splitedDate = date.split('-');

    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
  },
};

// Variable Form to get datas from HTML form inputs
const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor preencha todos os campos');
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      Modal.toggle();
    } catch (error) {
      alert(error.message);
    }
  },
};

// Function to load the application
const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
    DOM.updateCardColor();
    Storage.set(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    DOM.updateCardColor();
    App.init();
  },
};

App.init();

/* 
  Code made by Murilo Messias during the 
  "Maratona Discover" from Rocketseat 
*/
