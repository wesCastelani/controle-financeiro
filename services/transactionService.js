const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');

const transactionReturn = (body) => {
  const { description, value, category, year, month, day, type } = body;
  const period = `${year}-${month.toString().padStart(2, '0')}`;
  const yearMonthDay = `${period}-${day.toString().padStart(2, '0')}`;

  const newTransaction = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth: period,
    yearMonthDay,
    type,
  };

  return newTransaction;
};

const create = async (req, res) => {
  const newTransaction = transactionReturn(req.body);

  try {
    const addTransaction = await TransactionModel.create(newTransaction);
    res.send({ message: 'inserido com sucesso', transaction: addTransaction });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findPeriod = async (req, res) => {
  let yearMonth;

  if (!req.query.period) {
    res.status(500).send({ message: 'Informe o periodo em year-month' });
  } else {
    yearMonth = req.query.period;
  }

  var condition = yearMonth
    ? { yearMonth: { $regex: new RegExp(yearMonth), $options: 'i' } }
    : {};

  try {
    const data = await TransactionModel.find(condition);

    if (!data) {
      res.status(404).send({ message: 'Id não encontrado' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o periodo: ' + period });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizaçao vazio',
    });
  }
  const updateTransaction = transactionReturn(req.body);

  const id = req.params.id;

  try {
    const data = await TransactionModel.updateOne(
      { _id: id },
      updateTransaction
    );

    if (!data) {
      res.status(404).send({ message: 'Id não encontrado para atualização' });
    } else {
      res.send({ status: 'ok', transaction: updateTransaction });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.deleteOne({ _id: id });

    if (!data) {
      res.status(404).send({ message: 'Id não encontrado para exclusão' });
    } else {
      res.send(true);
    }
  } catch (error) {
    res.status(500).send({ message: 'Nao foi possivel deletar  ' + id });
  }
};

module.exports = { create, findPeriod, update, remove };
