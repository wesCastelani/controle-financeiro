const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/

const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  console.log('to aqui');

  const transactionModel = new TransactionModel({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });

  try {
    await transactionModel.save();

    //res.send(transactionModel);
    res.send({ message: 'inserido com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findPeriod = async (req, res) => {
  let yearMonth;

  if (!req.query.period) {
    res.status(500).send({ message: 'Informe o perido em year-month' });
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

const findDesc = async (req, res) => {
  const description = req.body.description;

  var condition = description
    ? { description: { $regex: new RegExp(description), $options: 'i' } }
    : {};

  try {
    const data = await TransactionModel.find(condition);

    if (!data) {
      res.status(404).send({ message: 'não encontrado' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar: ' + description });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!data) {
      res.status(404).send({ message: 'Id não encontrado para atualização' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = TransactionModel.findByIdAndRemove({ _id: id });

    if (!data) {
      res.status(404).send({ message: 'Id não encontrado para exclusão' });
    } else {
      res.send({ message: 'excluido com sucesso' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Nao foi possivel deletar  ' + id });
  }
};

module.exports = { create, findPeriod, findDesc, update, remove };
