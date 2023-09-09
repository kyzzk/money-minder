import React, { useState } from 'react';
import { Container, Modal, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoneyBillWave, faMoneyBill, faWallet, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Transaction {
  description: string;
  value: number;
  type: 'entrada' | 'saida';
  date: Date;
  category: string;
  bank: 'banco_inter' | 'banco_do_brasil' | 'auxilio_alimentacao' | 'auxilio_transporte' | 'auxilio_livre';
}

function App() {
  const categories = ["Renda", "Alimentação", "Utilidades", "Aluguel", "Compras", "Outros"];

  const [transactions, setTransactions] = useState<Transaction[]>([
    { description: 'NextAge', value: 2421.11, type: 'entrada', date: new Date('2023-09-06'), category: 'Renda Mensal', bank: 'banco_do_brasil' },

  ]);
  const [bank, setBank] = useState<'banco_inter' | 'banco_do_brasil' | 'auxilio_alimentacao' | 'auxilio_transporte' | 'auxilio_livre'>('banco_inter');
  const [editBank, setEditBank] = useState<'banco_inter' | 'banco_do_brasil' | 'auxilio_alimentacao' | 'auxilio_transporte' | 'auxilio_livre'>('banco_inter');

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editType, setEditType] = useState<'entrada' | 'saida'>('entrada');

  const openEditModal = (index: number) => {
    setEditIndex(index);
    const trans = transactions[index];
    setEditDescription(trans.description);
    setEditValue(trans.value.toString());
    setEditDate(trans.date.toISOString().split('T')[0]);
    setEditCategory(trans.category);
    setEditType(trans.type);
    setEditBank(trans.bank);
    setShowModal(true);
  };

  const saveEditTransaction = () => {
    if (editIndex !== null) {
      setTransactions(transactions.map((trans, index) => index === editIndex ? { description: editDescription, value: Number(editValue), type: editType, date: new Date(editDate), category: editCategory, bank: editBank } : trans));
      setShowModal(false);
    }
  };

  const resetForm = () => {
    setDescription('');
    setValue('0');
    setDate('');
    setCategory('');
  };
  const addTransaction = () => {
    setTransactions([...transactions, { description, value: Number(value), type, date: new Date(date), category, bank }]);
    resetForm();
  };
  const deleteTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const editTransaction = (index: number) => {
    const trans = transactions[index];
    setDescription(trans.description);
    setValue(trans.value.toString());
    setType(trans.type);
    setDate(trans.date.toISOString().split('T')[0]);
    setCategory(trans.category);
  };

  const total = transactions.reduce((acc, transaction) => transaction.type === 'entrada' ? acc + transaction.value : acc - transaction.value, 0);

  return (
    <Container style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <Row className="mt-4">
        <Col>
          <h1 style={{ textAlign: 'center', color: '#343a40' }}>Controle Financeiro Pessoal</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Entradas</Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faMoneyBillWave} /> {transactions.filter(trans => trans.type === 'entrada').reduce((acc, trans) => acc + trans.value, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Saídas</Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faMoneyBill} /> {transactions.filter(trans => trans.type === 'saida').reduce((acc, trans) => acc + trans.value, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Valor Disponível</Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faWallet} /> {total}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Benefícios (Cartão Caju)</Card.Title>
              <Card.Text>
                Saldo Livre: R$ X.XX <br />
                Auxílio Alimentação: R$ Y.YY <br />
                Auxílio Transporte: R$ Z.ZZ
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Investimentos</Card.Title>
              <Card.Text>
                Renda Fixa: R$ A.AA <br />
                Renda Variável: R$ B.BB <br />
                Poupança: R$ C.CC
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>FGTS</Card.Title>
              <Card.Text>
                Valor Total: R$ D.DD
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Adicionar Transação</Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="description">
                      <Form.Label>Descrição</Form.Label>
                      <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="value">
                      <Form.Label>Valor</Form.Label>
                      <Form.Control type="number" value={value} onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="date">
                      <Form.Label>Data</Form.Label>
                      <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="category">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="bank">
                      <Form.Label>Banco</Form.Label>
                      <Form.Control as="select" value={bank} onChange={(e) => setBank(e.target.value as 'banco_inter' | 'banco_do_brasil' | 'auxilio_alimentacao' | 'auxilio_transporte' | 'auxilio_livre')}>
                        <option value="banco_inter">Banco Inter</option>
                        <option value="banco_do_brasil">Banco do Brasil</option>
                        <option value="auxilio_alimentacao">Auxílio Alimentação</option>
                        <option value="auxilio_transporte">Auxílio Transporte</option>
                        <option value="auxilio_livre">Auxílio Livre</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="type">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value as 'entrada' | 'saida')}>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="d-flex align-items-end">
                    <Button variant="primary" onClick={addTransaction}>
                      <FontAwesomeIcon icon={faPlus} /> Adicionar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Origem</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans, index) => (
                <tr key={index}>
                  <td>{trans.description}</td>
                  <td>{trans.value}</td>
                  <td>{trans.category}</td>
                  <td>{trans.bank}</td>
                  <td>{trans.date.toLocaleDateString()}</td>
                  <td>{trans.type}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => openEditModal(index)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTransaction(index)} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="editDescription">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="editValue">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type="number"
                    value={editValue}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="editDate">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    value={editDate}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="editCategory">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control
                    as="select"
                    value={editCategory}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="editBank">
                  <Form.Label>Banco</Form.Label>
                  <Form.Control as="select" value={editBank} onChange={(e) => setEditBank(e.target.value as 'banco_inter' | 'banco_do_brasil' | 'auxilio_alimentacao' | 'auxilio_transporte' | 'auxilio_livre')}>
                    <option value="banco_inter">Banco Inter</option>
                    <option value="banco_do_brasil">Banco do Brasil</option>
                    <option value="auxilio_alimentacao">Auxílio Alimentação</option>
                    <option value="auxilio_transporte">Auxílio Transporte</option>
                    <option value="auxilio_livre">Auxílio Livre</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="editType">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    as="select"
                    value={editType}
                    onChange={(e) => setType(e.target.value as 'entrada' | 'saida')}
                  >
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={saveEditTransaction}>Salvar Alterações</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default App;
