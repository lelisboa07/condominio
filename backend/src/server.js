const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    return res.send('Hello, World!')
})


// MORADOR

app.post('/morador/cadastro', (req, res) => {
    const { nome, bloco, apartamento, telefone, email, status } = req.body;
    
    const query = 'INSERT INTO morador (nome, bloco, apartamento, telefone, email, status) VALUES (?, ?, ?, ?, ?, ?)'
    connection.query(query, [nome, bloco, apartamento, telefone, email, status], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro no servidor'})
        }
        res.status(201).json({success: true, results, message: 'Sucesso no cadastro!'})
    })
})

app.get('/morador', (req, res) => {

    const query = 'SELECT * FROM morador'
    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao buscar morador'})
        } 
        res.json({success: true, morador: results})
    })
})

app.put('/morador/:id', (req, res) => {
    const { id } = req.params
    const { nome, bloco, apartamento, telefone, email, status } = req.body

    const query = 'UPDATE morador SET nome = ?, bloco = ?, apartamento = ?, telefone = ?, email = ?, status = ? WHERE id = ?'
    connection.query(query, [nome, bloco, apartamento, telefone, email, status, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao editar morador'})
        }
        res.json({ success: true, message: 'Morador editado com sucesso!' })
    })
})

app.delete('/morador/:id', (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM morador WHERE id = ?'
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao deletar morador' })
        }
        res.json({ success: true, message: 'Morador deletado com sucesso' })
    })
})


// VEICULO

app.post('/veiculo/cadastro', (req, res) => {
    const {placa, modelo, cor, box, morador_id} = req.body

    const query = 'INSERT INTO veiculo (placa, modelo, cor, box, morador_id) VALUES (?, ?, ?, ?, ?)'
    connection.query(query, [placa, modelo, cor, box, morador_id], (err, results) => {
        if(err) {
            return res.status(500).json({success: false, err, message: 'Erro no Servidor'})
        }
        res.status(201).json({success: true, results, message: 'Sucesso no cadastro do veículo'})
    })
})

app.get('/veiculo', (req, res) => {

    const query = 'SELECT * FROM veiculo'
    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao buscar carro'})
        } 
        res.json({success: true, veiculo: results})
    })
})

app.put('/veiculo/:id', (req, res) => {
    const { id } = req.params
    const { placa, modelo, cor } = req.body

    const query = 'UPDATE veiculo SET placa = ?, modelo = ?, cor = ? WHERE id = ?'
    connection.query(query, [placa, modelo, cor, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao editar veículo'})
        }
        res.json({ success: true, message: 'Carro editado com sucesso!' })
    })
})

app.delete('/veiculo/:id', (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM veiculo WHERE id = ?'
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao deletar veículo' })
        }
        res.json({ success: true, message: 'Veículo deletado com sucesso' })
    })
})

app.listen(port, () => console.log(`Server rodando na porta ${port}`))